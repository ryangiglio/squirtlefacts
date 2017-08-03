// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

// Config
import facts from '../data/facts';

class Fact extends Component {
  constructor() {
    super();

    autobind(this);
  }

  handleNewFact(e) {
    e.preventDefault();

    if (this.props.socket) {
      this.props.socket.emit('RELAY_TO_REMOTE', {
        type: 'SQUIRTLE_LEVELUP',
      });
    }

    this.props.changeFact();
  }

  render() {
    const { currFactIndex } = this.props;

    return (
      <div className="Fact">
        <h2 className="Fact__headline">Did you know...</h2>
        <p className="Fact__text">{ facts[currFactIndex] }</p>
        <button className="Fact__new" onClick={ this.handleNewFact }>Another Fact!</button>
      </div>
    );
  }
}

Fact.propTypes = {
  socket: PropTypes.object,
  currFactIndex: PropTypes.number.isRequired,

  changeFact: PropTypes.func.isRequired,
}

Fact.defaultProps = {
  socket: null,
}

export default Fact;
