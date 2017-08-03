// Redux
import { connect } from 'react-redux';

// Actions
import { closePairedModal } from '../ducks/ui';

// Components
import PairedModal from '../components/PairedModal';

function mapState(state) {
  return {
    gameResumed: state.sockets.gameResumed,
  };
}

function mapDispatch(dispatch) {
  return {
    closePairedModal: () => dispatch(closePairedModal()),
  };
}

export default connect(mapState, mapDispatch)(PairedModal);
