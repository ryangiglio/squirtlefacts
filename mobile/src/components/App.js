// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

// Vendor
import io from 'socket.io-client';

import { socketUrl } from '../config';

// Components
import Game from '../containers/Game';
import ConnectModal from '../containers/ConnectModal';
import ConnectionStatus from '../containers/ConnectionStatus';

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

      // If this remote was connected to a site in an older session
      // TODO: Move these into the Redux store
      if (localStorage.getItem('remoteSocketId') && localStorage.getItem('siteSocketId')) {
        // TODO: Set a reconnecting flag to show in status

        socket.emit('REMOTE_RECONNECTING', {
          oldRemoteSocketId: localStorage.getItem('remoteSocketId'),
          siteSocketId: localStorage.getItem('siteSocketId'),
        });
      }
    });
  }

  setupSocketListeners() {
    const socket = this.props.socket;

    socket.on('REMOTE_PAIRED', this.remotePaired);

    socket.on('SITE_DISCONNECTED', this.siteDisconnected);
    
    socket.on('SITE_RECONNECTING_CALL', this.siteReconnectingCall);

    socket.on('SITE_RECONNECTED', this.siteReconnected);

    socket.on('SQUIRTLE_LEVELUP', this.handleLevelUp);
  }

  remotePaired(siteSocketId) {
    this.props.setRemotePaired();

    localStorage.setItem('remoteSocketId', this.props.socket.id);
    localStorage.setItem('siteSocketId', siteSocketId);
  }

  siteReconnectingCall(siteSocketIds) {
    // If the old socket ids match, it was the same connection
    if (localStorage.getItem('siteSocketId') === siteSocketIds.oldSiteSocketId) {
      // Ping it back
      this.props.socket.emit('SITE_RECONNECTING_RESPONSE', {
        siteSocketIds,
        resuming: this.props.level > 0,
      });
    }
  }

  siteReconnected(newSiteSocketId) {
    this.props.setRemotePaired();

    localStorage.setItem('siteSocketId', newSiteSocketId);
  }

  siteDisconnected() {
    this.props.setRemoteDisconnected();
  }

  handleLevelUp() {
    const { level, addAlert, name, showRename, evolve, learnMove, levelUp } = this.props;

    // Calculate the next level
    const newLevel = level + 1;

    // Evolutions
    if (newLevel === 1) {
      // addAlert('hatch', `${ name } hatched from the Egg!`);
      showRename();
    } else if (newLevel === 16) {
      evolve('Wartortle');
      addAlert('evolution', `Congratulations! ${ name } evolved into Wartortle!`);
    } else if (newLevel === 36) {
      evolve('Blastoise');
      addAlert('evolution', `Congratulations! ${ name } evolved into Blastoise!`);
    }

    // Moves
    if (newLevel === 8) {
      learnMove('Bubble');
      addAlert('move', `${ name } has learned Bubble!`);
    } else if (newLevel === 15) {
      learnMove('Water Gun');
      addAlert('move', `${ name } has learned Water Gun!`);
    } else if (newLevel === 24) { // Wartortle
      learnMove('Bite');
      addAlert('move', `${ name } has learned Bite!`);
    } else if (newLevel === 31) {
      learnMove('Withdraw');
      addAlert('move', `${ name } has learned Withdraw!`);
    } else if (newLevel === 42) { // Blastoise
      learnMove('Skull Bash');
      addAlert('move', `${ name } has learned Skull Bash!`);
    } else if (newLevel === 55) {
      learnMove('Hydro Pump');
      addAlert('move', `${ name } has learned Hydro Pump!`);
    }

    // Bump the level
    // NOTE: This is after the alerts so we don't have a race between the reducer and the conditionals 
    levelUp();
  }

  handleAlertClick(index) {
    this.props.clearAlert(index);
  }

  render() {
    const { socketConnected, remotePaired } = this.props;

    // TODO: Add "no socket connected" state

    return (
      <div className="App">
        { socketConnected && (
          !remotePaired ? (
            <ConnectModal />
          ) : (
            <Game />
          )
        )}
        <ConnectionStatus />
      </div>
    );
  }
}

App.propTypes = {
  // State
  // Socket
  socketConnected: PropTypes.bool.isRequired,
  socket: PropTypes.object,
  enteredKey: PropTypes.string.isRequired,
  remotePaired: PropTypes.bool.isRequired,

  // Dispatch
  // Socket
  saveSocketConnection: PropTypes.func.isRequired, 
  setRemotePaired: PropTypes.func.isRequired,
  setRemoteDisconnected: PropTypes.func.isRequired,
  // Squirtle
  levelUp: PropTypes.func.isRequired,
  learnMove: PropTypes.func.isRequired,
  evolve: PropTypes.func.isRequired,
  // UI
  addAlert: PropTypes.func.isRequired,
  showRename: PropTypes.func.isRequired,
}

App.defaultProps = {
  // Non-required props
  socket: null,
}

export default App;
