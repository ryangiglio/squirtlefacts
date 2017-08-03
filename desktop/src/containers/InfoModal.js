// Redux
import { connect } from 'react-redux';

// Actions
import { closeInfoModal } from '../ducks/ui';

// Components
import InfoModal from '../components/InfoModal';

function mapState(state) {
  return {
  };
}

function mapDispatch(dispatch) {
  return {
    // UI
    closeInfoModal: () => dispatch(closeInfoModal()),
  };
}

export default connect(mapState, mapDispatch)(InfoModal);
