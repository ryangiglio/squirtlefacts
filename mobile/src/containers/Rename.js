// Redux
import { connect } from 'react-redux';
import { rename } from '../ducks/squirtle';
import { hideRename } from '../ducks/ui';

// Components
import Rename from '../components/Rename';

function mapState(state) {
  return {
    // Squirtle
    name: state.squirtle.name,
    hueRotate: state.squirtle.hueRotate,
  };
}

function mapDispatch(dispatch) {
  return {
    // Squirtle
    rename: (name) => dispatch(rename(name)),

    // UI
    hideRename: () => dispatch(hideRename()),
  };
}

export default connect(mapState, mapDispatch)(Rename);
