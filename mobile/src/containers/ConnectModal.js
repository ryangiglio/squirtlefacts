// Redux
import { connect } from 'react-redux';

// Components
import ConnectModal from '../components/ConnectModal';

function mapState(state) {
  return {
    // Sockets
    socketConnected: state.sockets.socketConnected,
    socket: state.sockets.socket,

    // Squirtle
    name: state.squirtle.name,
    species: state.squirtle.species,
    level: state.squirtle.level,
    hueRotate: state.squirtle.hueRotate,
  };
}

function mapDispatch(dispatch) {
  return {
  };
}

export default connect(mapState, mapDispatch)(ConnectModal);
