// Redux
import { connect } from 'react-redux';

// Components
import ConnectionStatus from '../components/ConnectionStatus';

function mapState(state) {
  return {
    // Sockets
    socketConnected: state.sockets.socketConnected,
    remotePaired: state.sockets.remotePaired,
  };
}

function mapDispatch(dispatch) {
  return {
  };
}

export default connect(mapState, mapDispatch)(ConnectionStatus);
