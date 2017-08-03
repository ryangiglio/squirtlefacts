// Redux
import { connect } from 'react-redux';
import { saveSocketConnection, setRemotePaired, setRemoteDisconnected } from '../ducks/sockets';
import { levelUp, learnMove, evolve } from '../ducks/squirtle';
import { addAlert } from '../ducks/alerts';
import { showRename } from '../ducks/ui';

// Components
import App from '../components/App';

function mapState(state) {
  return {
    // Sockets
    socketConnected: state.sockets.socketConnected,
    socket: state.sockets.socket,
    enteredKey: state.sockets.enteredKey,
    remotePaired: state.sockets.remotePaired,

    // Squirtle
    name: state.squirtle.name,
    species: state.squirtle.species,
    level: state.squirtle.level,
    hueRotate: state.squirtle.hueRotate,
  };
}

function mapDispatch(dispatch) {
  return {
    // Sockets
    saveSocketConnection: (socket) => dispatch(saveSocketConnection(socket)),
    setRemotePaired: () => dispatch(setRemotePaired()),
    setRemoteDisconnected: () => dispatch(setRemoteDisconnected()),

    // Squirtle
    levelUp: () => dispatch(levelUp()),
    learnMove: (name) => dispatch(learnMove(name)),
    evolve: (newSpecies) => dispatch(evolve(newSpecies)),

    // Alerts
    addAlert: (alertType, text) => dispatch(addAlert(alertType, text)),

    // UI
    showRename: () => dispatch(showRename()),
  };
}

export default connect(mapState, mapDispatch)(App);
