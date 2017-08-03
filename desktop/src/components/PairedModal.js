// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

class PairedModal extends Component {
  constructor() {
    super();

    autobind(this);
  }

  handleClosePairedModal() {
    this.props.closePairedModal();
  }

  render() {
    const { gameResumed } = this.props;

    return (
      <div className="PairedModal">
        { gameResumed ? (
            <div className="PairedModal__content">
              <p className="PairedModal__headline">Thanks for bringing Squirtle back!</p>
              <p className="PairedModal__text">Remember, our Squirtles feed on Knowledge! The more facts you read, the stronger they get!</p>
              <button className="PairedModal__close" onClick={ this.handleClosePairedModal }>Let's Get Learning!</button>
            </div>
          ) : (
            <div className="PairedModal__content">
              <p className="PairedModal__headline">Great! Thanks for doing that!</p>
              <p className="PairedModal__text">Our Squirtles feed on Knowledge! The more facts you read, the stronger they get!</p>
              <button className="PairedModal__close" onClick={ this.handleClosePairedModal }>Let's Get Learning!</button>
            </div>
          )
        }
      </div>
    );
  }
}

PairedModal.propTypes = {
  gameResumed: PropTypes.bool.isRequired,

  closePairedModal: PropTypes.func.isRequired,
}

export default PairedModal;
