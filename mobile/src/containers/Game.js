// Redux
import { connect } from "react-redux";
import { resetSquirtle } from '../ducks/squirtle';
import { clearAllAlerts } from '../ducks/alerts';
import { hideRename } from '../ducks/ui';

// Components
import Game from '../components/Game';

function mapState(state) {
  return {
    // UI
    rename: state.ui.rename,
  };
}

function mapDispatch(dispatch) {
  return {
    // Squirtle
    resetSquirtle: () => dispatch(resetSquirtle()),

    // Alerts
    clearAllAlerts: () => dispatch(clearAllAlerts()),

    // UI
    hideRename: () => dispatch(hideRename()),
  };
}

export default connect(mapState, mapDispatch)(Game);
