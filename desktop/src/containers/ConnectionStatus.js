// Redux
import { connect } from 'react-redux';

// Actions
import { openKeyModal, closeKeyModal } from '../ducks/ui';

// Components
import ConnectionStatus from '../components/ConnectionStatus';

function mapState(state) {
  return {
    // Sockets
    socketConnected: state.sockets.socketConnected,
    reconnecting: state.sockets.reconnecting,
    remotePaired: state.sockets.remotePaired,
    remoteKey: state.sockets.remoteKey,
  };
}

function mapDispatch(dispatch) {
  return {
    // UI
    openKeyModal: () => dispatch(openKeyModal()),
    closeKeyModal: () => dispatch(closeKeyModal()),
  };
}

export default connect(mapState, mapDispatch)(ConnectionStatus);
