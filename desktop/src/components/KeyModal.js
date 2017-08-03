// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

// Config
import { mobileUrl } from '../config';

// Assets
import eggImg from '../assets/egg.png';

class KeyModal extends Component {
  constructor() {
    super();

    autobind(this);
  }

  handleCloseKeyModal() {
    this.props.closeKeyModal();
  }

  render() {
    const { remoteKey } = this.props;

    return (
      <div className="KeyModal">
        <p className="KeyModal__headline">Hey! You have a smartphone, right?</p>
        <p className="KeyModal__text">Would mind taking care of this Squirtle egg?</p>
        <img className="KeyModal__img" src={ eggImg } alt="Squirtle Egg" />
        <p className="KeyModal__text">Enter the code below at { mobileUrl } and we'll transfer it to your device.</p>
        <p className="KeyModal__key">{ remoteKey }</p>
        <button className="KeyModal__close" onClick={ this.handleCloseKeyModal }>No thanks, just show me the facts</button>
      </div>
    );
  }
}

KeyModal.propTypes = {
  remoteKey: PropTypes.string.isRequired,

  closeKeyModal: PropTypes.func.isRequired,
}

export default KeyModal;
