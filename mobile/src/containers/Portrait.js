// Redux
import { connect } from "react-redux";

// Components
import Portrait from '../components/Portrait';

function mapState(state) {
  return {
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

export default connect(mapState, mapDispatch)(Portrait);
