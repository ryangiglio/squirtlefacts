// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

// Vendor libs
import io from 'socket.io-client';

// Config
import { socketUrl, reconnectLength } from '../config';

// Components
import Fact from '../containers/Fact';
import InfoModal from '../containers/InfoModal';
import KeyModal from '../containers/KeyModal';
import PairedModal from '../containers/PairedModal';
import Footer from '../containers/Footer';

class App extends Component {
  constructor() {
    super();

    autobind(this);
  }

  componentWillMount() {
    if (!this.props.socketConnected) {
      this.initSocket();
    }

    // Save and update the proper window height
    document.querySelector('body').style.setProperty('--window-height', `${window.innerHeight}px`);

    window.addEventListener('resize', () => {
      document.querySelector('body').style.setProperty('--window-height', `${window.innerHeight}px`);
    });
  }

  // Connect to the socket server
  initSocket() {
    const socket = io(socketUrl);

    socket.on('connection', () => {
      this.props.saveSocketConnection(socket);

      this.setupSocketListeners();

      // If there was a remote connected in an older session
      // TODO: Move these into the Redux store
      if (localStorage.getItem('siteSocketId') && localStorage.getItem('remoteSocketId')) {
        this.props.setReconnectingStarted();

        // Try and reconnect to that remote
        socket.emit('SITE_RECONNECTING', {
          oldSiteSocketId: localStorage.getItem('siteSocketId'),
          remoteSocketId: localStorage.getItem('remoteSocketId'),
        });

        // Wait to try and reconnect before getting a new key
        this.reconnectTimeout = setTimeout(() => {
          // Tell the server we're ready for a key
          socket.emit('SITE_READY');
          
          this.props.setReconnectingStopped();

        }, reconnectLength);
      } else {
        // Tell the server we're ready for a key
        socket.emit('SITE_READY');
      }
    });
  }

  setupSocketListeners() {
    const socket = this.props.socket;

    socket.on('USER_GENERATED', this.userGenerated);

    socket.on('REMOTE_PAIRED', this.remotePaired);

    socket.on('REMOTE_DISCONNECTED', this.remoteDisconnected);

    socket.on('REMOTE_RECONNECTING_CALL', this.remoteReconnectingCall);

    socket.on('REMOTE_RECONNECTED', this.remotePaired);
  }

  userGenerated(remoteKey) {
    // If this is the first time a remote was paired
    if (this.props.firstPairing) {
      this.props.openKeyModal();
    }

    this.props.saveRemoteKey(remoteKey);
  }

  remotePaired({ remoteSocketId, resuming }) {
    // Clear our reconnection timeout if we were trying to reconnect
    clearTimeout(this.reconnectTimeout);

    this.props.setReconnectingStopped();

    this.props.setRemotePaired();

    // If the mobile device already had a Squirtle
    if (resuming) {
      this.props.setGameResumed();
    }

    this.props.closeKeyModal();

    this.props.openPairedModal();

    // Save the IDs so we can reconnect on a refresh
    localStorage.setItem('siteSocketId', this.props.socket.id);
    localStorage.setItem('remoteSocketId', remoteSocketId);
  }

  remoteReconnectingCall(remoteSocketIds) {
    // If the old socket ids match, it was the same connection
    if (localStorage.getItem('remoteSocketId') === remoteSocketIds.oldRemoteSocketId) {
      // Ping it back
      this.props.socket.emit('REMOTE_RECONNECTING_RESPONSE', remoteSocketIds);
    }
  }

  remoteDisconnected() {
    this.props.setRemoteDisconnected();

    // If a key hasn't been generated yet
    if (this.props.remoteKey === '') {
      // Tell the server we're ready for a key
      this.props.socket.emit('SITE_READY');
    }
  }

  render() {
    const { infoModalOpen, keyModalOpen, pairedModalOpen } = this.props;

    return (
      <div className="App">
        <h1 className="App__headline">Squirtle Facts</h1>

        <Fact />

        <Footer />

        { infoModalOpen &&
          <InfoModal />
        }

        { keyModalOpen &&
          <KeyModal />
        }

        { pairedModalOpen &&
          <PairedModal />
        }
      </div>
    );
  }
}

App.propTypes = {
  // State
  // Socket
  socketConnected: PropTypes.bool.isRequired,
  socket: PropTypes.object,
  remotePaired: PropTypes.bool.isRequired,
  remoteDisconnectedTimeout: PropTypes.object,
  remoteKey: PropTypes.string.isRequired,

  // UI 
  currFactIndex: PropTypes.number.isRequired,
  infoModalOpen: PropTypes.bool.isRequired,
  keyModalOpen: PropTypes.bool.isRequired,
  pairedModalOpen: PropTypes.bool.isRequired,

  // Dispatch 
  // State
  saveSocketConnection: PropTypes.func.isRequired, 
  setReconnectingStarted: PropTypes.func.isRequired,
  setReconnectingStopped: PropTypes.func.isRequired,
  saveRemoteKey: PropTypes.func.isRequired,
  setRemotePaired: PropTypes.func.isRequired,
  setRemoteDisconnected: PropTypes.func.isRequired,
  setGameResumed: PropTypes.func.isRequired,

  // UI
  openKeyModal: PropTypes.func.isRequired,
  closeKeyModal: PropTypes.func.isRequired,
}

App.defaultProps = {
  // Non-required props
  socket: null,
  remoteDisconnectedTimeout: null,
}

export default App;
