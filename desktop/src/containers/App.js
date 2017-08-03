// Redux
import { connect } from 'react-redux';

// Actions
import { saveSocketConnection, saveRemoteKey, setRemotePaired, setRemoteDisconnected, setReconnectingStarted, setReconnectingStopped, setGameResumed } from '../ducks/sockets';
import { changeFact, openInfoModal, openKeyModal, closeKeyModal, openPairedModal } from '../ducks/ui';

// Components
import App from '../components/App';

function mapState(state) {
  return {
    // Sockets
    socketConnected: state.sockets.socketConnected,
    socket: state.sockets.socket,
    reconnecting: state.sockets.reconnecting,
    remotePaired: state.sockets.remotePaired,
    remoteDisconnectedTimeout: state.sockets.remoteDisconnectedTimeout,
    remoteKey: state.sockets.remoteKey,
    firstPairing: state.sockets.firstPairing,
    gameResumed: state.sockets.gameResumed,

    // UI
    currFactIndex: state.ui.currFactIndex,
    infoModalOpen: state.ui.infoModalOpen,
    keyModalOpen: state.ui.keyModalOpen,
    pairedModalOpen: state.ui.pairedModalOpen,
  };
}

function mapDispatch(dispatch) {
  return {
    // Sockets
    saveSocketConnection: (socket) => dispatch(saveSocketConnection(socket)),
    setReconnectingStarted: () => dispatch(setReconnectingStarted()),
    setReconnectingStopped: () => dispatch(setReconnectingStopped()),
    saveRemoteKey: (key) => dispatch(saveRemoteKey(key)),
    setRemotePaired: () => dispatch(setRemotePaired()),
    setRemoteDisconnected: () => dispatch(setRemoteDisconnected()),
    setGameResumed: () => dispatch(setGameResumed()),

    // UI
    changeFact: () => dispatch(changeFact()),
    openInfoModal: () => dispatch(openInfoModal()),
    openKeyModal: () => dispatch(openKeyModal()),
    closeKeyModal: () => dispatch(closeKeyModal()),
    openPairedModal: () => dispatch(openPairedModal()),
  };
}

export default connect(mapState, mapDispatch)(App);
