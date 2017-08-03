// Redux
import { connect } from 'react-redux';

// Actions
import { changeFact } from '../ducks/ui';

// Components
import Fact from '../components/Fact';

function mapState(state) {
  return {
    // Socket
    socket: state.sockets.socket,

    // UI
    currFactIndex: state.ui.currFactIndex,
  };
}

function mapDispatch(dispatch) {
  return {
    // UI
    changeFact: () => dispatch(changeFact()),
  };
}

export default connect(mapState, mapDispatch)(Fact);

