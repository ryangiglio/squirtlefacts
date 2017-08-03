// Redux
import { connect } from 'react-redux';

// Actions
import { openInfoModal } from '../ducks/ui';

// Components
import Footer from '../components/Footer';

function mapState(state) {
  return {
  };
}

function mapDispatch(dispatch) {
  return {
    // UI
    openInfoModal: () => dispatch(openInfoModal()),
  };
}

export default connect(mapState, mapDispatch)(Footer);
