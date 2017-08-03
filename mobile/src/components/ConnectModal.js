// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

// Assets
import hatchImg from '../assets/hatch.png';
import squirtleImg from '../assets/squirtle.png';
import wartortleImg from '../assets/wartortle.png';
import blastoiseImg from '../assets/blastoise.png';

class ConnectModal extends Component {
  constructor() {
    super();

    autobind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    if (this.props.socketConnected) {
      this.props.socket.emit('REMOTE_PAIRING', {
        remoteKey: e.target.querySelector('#remote-key').value,
        resuming: this.props.level > 0,
      });
    }
    // TODO: Error message if socket isn't connected yet
  }
  
  render() {
    const { name, species, level, hueRotate } = this.props;

    let pokeImg = squirtleImg;

    if ( level >= 1 ) {
      if (species === 'Wartortle') {
        pokeImg = wartortleImg;
      } else if (species === 'Blastoise') {
        pokeImg = blastoiseImg;
      }
    }
    
    return (
      level > 0 ? (
        <div className="ConnectModal">
          <h1 className="ConnectModal__headline">Welcome back!</h1>
          <p className="ConnectModal__text">{ name } missed you!</p>
          <img 
            className="ConnectModal__img--squirtle"
            src={ pokeImg }
            alt={ `My ${species}, ${name}` }
            style={{
              filter: `hue-rotate(${hueRotate})`,
            }} />
          <form onSubmit={ this.handleFormSubmit } className="ConnectModal__form">
            <label className="ConnectModal__label" htmlFor="remote-key">Enter the Code:</label>
            <input className="ConnectModal__input" type="text" id="remote-key" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
            <button className="ConnectModal__submit">Let's Go!</button>
          </form>
        </div>
      ) : (
        <div className="ConnectModal">
          <h1 className="ConnectModal__headline">Thanks for helping!</h1>
          <p className="ConnectModal__text">So glad you’re here to feed little Squirtle and help it grow big and strong!</p>
          <img
            className="ConnectModal__img--egg"
            src={ hatchImg }
            alt="Hatching Squirtle" />
          <form onSubmit={ this.handleFormSubmit } className="ConnectModal__form">
            <label className="ConnectModal__label" htmlFor="remote-key">Enter the Code:</label>
            <input className="ConnectModal__input" type="text" id="remote-key" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
            <button className="ConnectModal__submit">Let's Go!</button>
          </form>
        </div>
      )
    )
  }
}

ConnectModal.propTypes = {
  // State
  // Socket
  socket: PropTypes.object,
  // Squirtle
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  hueRotate: PropTypes.string.isRequired,
}

ConnectModal.defaultProps = {
  // Non-required props
  socket: null,
}

export default ConnectModal;
