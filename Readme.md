# Squirtle Facts
Your #1 source for facts about everyone's favorite Tiny Turtle Pokemon, Squirtle!

## What the heck is this?
Squirtle Facts is a tech demo for using Websockets and a Node server to pair a Desktop site with a Mobile device. I've seen this technique applied to web games using the Mobile browser as a controller, but I wanted to go a step beyond that and create two separate experiences that communicate back and forth with each other.

## How does it work?
The crucial piece that allows the two sites to communicate is a [Socket.io](https://socket.io/)/[Express](https://expressjs.com/) server:
1) When the Desktop site is loaded, it connects to the socket server.
2) The server generates a unique user-friendly `remoteKey` for this connection and saves it in a `users` object, along with a reference to the socket.
3) The server sends the user-friendly `remoteKey` back to the Desktop site, where it's displayed to the user along with instructions.
4) The user visits the Mobile site, which connects to the socket server.
5) When a user enters the `remoteKey` on their mobile device, the server uses it to look up the Desktop socket in the `users` object and they both save references to each other.

Once this connection is established, if either browser is refreshed or if the user leaves and comes back later, the sites will automatically try and reconnect with each other:
1) When each site first connects to the socket server, it saves its own `socketID` in a browser cookie.
2) When the Desktop and Mobile sites are paired, they also save their pair's `socketID` in a browser cookie.

Let's use the Mobile site as an example:

3) The next time the Mobile site loads it will see those two cookies and send a message to the server that says "Hey, I used to be `mobileSocketID` connected to `desktopSocketID`. If `desktopSocketID` is still connected, could you reconnect us?"
4) The server looks up `desktopSocketID` in the `users` object, and if it's found, sends a message to the site through that socket that says "Hey, you have a mobile site trying to reconnect. Are you still there?"
5) If the desktop site is still connected, it receives this message and replies with "Yes, I'm still here. Reconnect us!"
6) The server updates the `users` and `remotes` objects to pair up the new `mobileSocketID` with the old `desktopSocketID`. The sites are paired again!

Both Desktop and Mobile sites themselves are relatively striaghtforward [React](https://facebook.github.io/react/)/[Redux](http://redux.js.org/) apps. They both connect to the socket server in their main `componentWillMount` method and save the connection info in the Redux store. The Desktop site doesn't maintain any state between sessions, but the Mobile site uses `redux-persist` to save your Squirtle's stats to `localStorage` so he's always there when you come back for more facts!
