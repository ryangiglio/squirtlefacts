// Redux
import { connect } from "react-redux";

// Components
import Moves from '../components/Moves';

function mapState(state) {
  return {
    // Squirtle
    moves: state.squirtle.moves,
  };
}

function mapDispatch(dispatch) {
  return {
  };
}

export default connect(mapState, mapDispatch)(Moves);
