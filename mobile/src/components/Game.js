// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

// Components
import Portrait from '../containers/Portrait';
import Moves from '../containers/Moves';
import Alerts from '../containers/Alerts';
import Rename from '../containers/Rename';

class Game extends Component {
  constructor() {
    super();

    autobind(this);
  }
  
  handleResetClick() {
    this.props.resetSquirtle();
    this.props.clearAllAlerts();
    this.props.hideRename();
  }

  render() {
    const { rename } = this.props;
    return (
      <div className="Game">
        <Portrait />
        <Moves />
        <Alerts />
        { rename &&
          <Rename />
        }
        <span className="Game__reset" onClick={ this.handleResetClick }><i className="fa fa-times-circle" aria-hidden="true"></i> Reset</span>
      </div>
    )
  }
}

Game.propTypes = {
  // State
  // UI
  rename: PropTypes.bool.isRequired,

  // Dispatch
  // Squirtle
  resetSquirtle: PropTypes.func.isRequired,
  // UI
  hideRename: PropTypes.func.isRequired,
}

export default Game;
