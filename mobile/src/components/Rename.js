// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

// Assets
import squirtleImg from '../assets/squirtle.png';

class Rename extends Component {
  constructor() {
    super();

    autobind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.props.rename(e.target.querySelector('#new-name').value);
    this.props.hideRename();
  }
  
  render() {
    const { name, hueRotate } = this.props;
    
    return (
      <div className="Rename">
        <h2 className="Rename__header">Squirtle has hatched from the egg!</h2>
        <img
          className="Rename__image"
          src={ squirtleImg }
          style={{
            filter: `hue-rotate(${hueRotate})`,
          }}
          alt="Your new Squirtle!"
        />
        <form className="Rename__form" onSubmit={ this.handleFormSubmit }>
          <label className="Rename__label">Would you like to give a nickname to the newly hatched Squirtle?</label>
          <input className="Rename__input" id="new-name" defaultValue={ name } type="text" />
          <button className="Rename__submit">Submit</button>
        </form>
      </div>
    )
  }
}

Rename.propTypes = {
  // State
  // Squirtle
  name: PropTypes.string.isRequired,
  hueRotate: PropTypes.string.isRequired,

  // Dispatch
  // Squirtle
  rename: PropTypes.func.isRequired,
  // UI
  hideRename: PropTypes.func.isRequired,
}

export default Rename;
