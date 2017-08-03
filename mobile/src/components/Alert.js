// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

class Alert extends Component {
  constructor() {
    super();

    autobind(this);
  }
  
  handleCloseAlert() {
    this.props.clearAlert(this.props.index);
  }
  
  render() {
    const { text } = this.props;
    
    return (
      <div className="Alert">
        <p className="Alert__text">{ text }</p>
        <button className="Alert__close" onClick={ this.handleCloseAlert }>Close Alert</button>
      </div>
    )
  }
}

Alert.propTypes = {
  // State
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,

  // Dispatch
  clearAlert: PropTypes.func.isRequired,
}

export default Alert;
