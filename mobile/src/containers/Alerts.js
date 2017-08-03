// Redux
import { connect } from 'react-redux';
import { clearAlert } from '../ducks/alerts';

// Components
import Alerts from '../components/Alerts';

function mapState(state) {
  return {
    // Alerts
    alerts: state.alerts,
  };
}

function mapDispatch(dispatch) {
  return {
    // Alerts
    clearAlert: (index) => dispatch(clearAlert(index)),
  };
}

export default connect(mapState, mapDispatch)(Alerts);
