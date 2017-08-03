const express = require('express'),
      http    = require('http'),
      app     = express(),
      server  = http.createServer(app),
      port    = 8080
      io      = require('socket.io')(server)
      shortid = require('shortid')
      _       = require('lodash');

server.listen(port, function() {
  console.log('Server running on port: ' + port);
});

// Keyed by SOCKET ID
const users = {};

// Keyed by SOCKET ID
const remotes = {};

// When any page established a connection to the server
io.on('connection', function(socket) {
  console.log(`User connected on socket ${socket.id}`);

  socket.emit('connection');

  socket.on('disconnect', function() {
    console.log(`User disconnected on socket ${socket.id}`);

    // If it was a site disconnecting
    if (users[socket.id]) {
      const remoteSocket = users[socket.id].remoteSocket;

      if (remoteSocket) {
        remoteSocket.emit('SITE_DISCONNECTED');
      }
    }

    // If it was a remote disconnecting
    if (remotes[socket.id]) {
      const siteSocket = remotes[socket.id].siteSocket;

      if (siteSocket) {
        siteSocket.emit('REMOTE_DISCONNECTED');
      }
    }
  });

  // After the site identifies itself
  socket.on('SITE_READY', function() {
    const remoteKey = shortid.generate();
    console.log(`Generated remote key "${remoteKey}" for socket ${socket.id}`)

    // Save the user
    users[socket.id] = {
      siteSocket: socket,
      remoteKey: remoteKey,
      remoteSocket: undefined,
    };

    socket.emit('USER_GENERATED', remoteKey);
  });

  // If a site is trying to reconnect to a pre-connected remote (like a page refresh)
  socket.on('SITE_RECONNECTING', function(ids) {
    const { oldSiteSocketId, remoteSocketId } = ids;

    // Get the previous connection
    const prevConnection = users[oldSiteSocketId];

    // If the previous connection was found
    if (prevConnection && prevConnection.remoteSocket) {
      // Ping the remote
      prevConnection.remoteSocket.emit('SITE_RECONNECTING_CALL', {
        oldSiteSocketId: oldSiteSocketId,
        newSiteSocketId: socket.id,
      });

      // Setup a new connection for the remote to join
      users[socket.id] = {
        siteSocket: socket,
        remoteKey: prevConnection.remoteKey,
        remoteSocket: undefined,
      }
    } else {
      // TODO: Handle failed
      socket.emit('SITE_RECONNECTING_FAILED');
    }
  });

  // Remote confirms reconnection attempt
  socket.on('SITE_RECONNECTING_RESPONSE', function({ siteSocketIds, resuming }) {
    // Get the new site connection via the new site socket id
    const newSiteConnection = users[siteSocketIds.newSiteSocketId];

    if (newSiteConnection) {
      // Connect the remote to it
      newSiteConnection.remoteSocket = socket;
      newSiteConnection.siteSocket.emit('REMOTE_PAIRED', {
        remoteSocketId: newSiteConnection.remoteSocket.id,
        resuming,
      });
    }

    // Get the remote connection via this call socket id
    const remoteConnection = remotes[socket.id];

    if (remoteConnection) {
      // Connect the site to it
      remoteConnection.siteSocket = newSiteConnection.siteSocket;
      remoteConnection.remoteSocket.emit('SITE_RECONNECTED', newSiteConnection.siteSocket.id);
    }

    // Delete the old connection
    delete(users[siteSocketIds.oldSiteSocketId]);
  });

  // If a remote is trying to reconnect to a site
  socket.on('REMOTE_RECONNECTING', function(ids) {
    const { oldRemoteSocketId, siteSocketId } = ids;

    // Get the previous connection
    const prevConnection = remotes[oldRemoteSocketId];

    // If the previous connection was found
    if (prevConnection && prevConnection.siteSocket) {
      // Ping the site
      prevConnection.siteSocket.emit('REMOTE_RECONNECTING_CALL', {
        oldRemoteSocketId: oldRemoteSocketId,
        newRemoteSocketId: socket.id,
      });

      // Setup a new connection for the site to join
      remotes[socket.id] = {
        remoteSocket: socket,
        siteSocket: undefined,
        remoteKey: prevConnection.remoteKey,
      }
    } else {
      // TODO: Handle failed
      socket.emit('REMOTE_RECONNECTING_FAILED');
    }
  });

  // Site confirms reconnection attempt
  socket.on('REMOTE_RECONNECTING_RESPONSE', function(socketIds) {
    // Get the new remote connection via the new remote socket id
    const newRemoteConnection = remotes[socketIds.newRemoteSocketId];

    if (newRemoteConnection) {
      // Connect the site to it
      newRemoteConnection.siteSocket = socket;
      newRemoteConnection.remoteSocket.emit('REMOTE_PAIRED', newRemoteConnection.siteSocket.id);
    }

    // Get the site connection via this call socket id
    const siteConnection = users[socket.id];

    if (siteConnection) {
      // Connect the remote to it
      siteConnection.remoteSocket = newRemoteConnection.remoteSocket;
      siteConnection.siteSocket.emit('REMOTE_RECONNECTED', {
        remoteSocketId: newRemoteConnection.remoteSocket.id,
        resuming: true,
      });
    }

    // Delete the old connection
    delete(remotes[socketIds.oldRemoteSocketId]);
  });

  // After the remote identifies itself
  socket.on('REMOTE_PAIRING', function({ remoteKey, resuming }) {
    console.log('connecting from remote with key', remoteKey);
    // Find user with that remote key
    const user = _.find(users, { remoteKey: remoteKey });

    // If there is a user with this key and it doesn't already have a remote
    if (user && user.remoteSocket === undefined) {
      // Associate this remote with that site
      user.remoteSocket = socket;

      // Save this remote
      remotes[socket.id] = {
        remoteSocket: socket,
        siteSocket: user.siteSocket,
        remoteKey: remoteKey,
      };

      console.log(`Remote at socket ${socket.id} connected with key "${remoteKey}" on socket ${user.siteSocket.id}`);

      // Emit to the remote
      socket.emit('REMOTE_PAIRED', user.siteSocket.id);
      // Emit to the site
      console.log('resuming', resuming);
      user.siteSocket.emit('REMOTE_PAIRED', {
        remoteSocketId: socket.id,
        resuming,
      });
    }
  });

  socket.on('RELAY_TO_REMOTE', function(action) {
    // If there is a remote socket
    if (users[socket.id].remoteSocket) {
      console.log(`Site ${socket.id} relaying ${action.type} to remote ${users[socket.id].remoteSocket.id}`);
      users[socket.id].remoteSocket.emit(action.type, action.data);
    }
  });

  socket.on('RELAY_TO_SITE', function(action) {
    // If there is a remote socket
    if (remotes[socket.id].siteSocket) {
      console.log(`Remote ${socket.id} relaying ${action.type} to site ${remotes[socket.id].siteSocket.id}`);
      remotes[socket.id].siteSocket.emit(action.type, action.data);
    }
  });
});
