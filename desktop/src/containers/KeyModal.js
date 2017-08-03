// Redux
import { connect } from 'react-redux';

// Actions
import { closeKeyModal } from '../ducks/ui';

// Components
import KeyModal from '../components/KeyModal';

function mapState(state) {
  return {
    remoteKey: state.sockets.remoteKey,
  };
}

function mapDispatch(dispatch) {
  return {
    closeKeyModal: () => dispatch(closeKeyModal()),
  };
}

export default connect(mapState, mapDispatch)(KeyModal);
