// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

class InfoModal extends Component {
  constructor() {
    super();

    autobind(this);
  }

  handleCloseInfoModal() {
    this.props.closeInfoModal();
  }

  render() {
    return (
      <div className="InfoModal">
        <h2 className="InfoModal__headline">What the heck is this?</h2>
        <p className="InfoModal__text">Squirtle Facts is a tech demo for using Websockets and a Node server to pair a Desktop site with a Mobile device. I've seen this technique applied to web games using the Mobile browser as a controller, but I wanted to go a step beyond that and create two separate experiences that communicate back and forth with each other. For more info about how it works, <a href="https://github.com/ryangiglio/squirtlefacts" target="_blank" rel="noopener noreferrer">check out the repo and readme on Github</a>.</p>
        
        <button className="InfoModal__close" onClick={ this.handleCloseInfoModal }>Back to the facts!</button>
      </div>
    );
  }
}

InfoModal.propTypes = {
  closeInfoModal: PropTypes.func.isRequired,
}

export default InfoModal;
