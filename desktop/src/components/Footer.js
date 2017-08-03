// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

// Components
import ConnectionStatus from '../containers/ConnectionStatus';

class Footer extends Component {
  constructor() {
    super();

    autobind(this);
  }

  handleOpenInfo() {
    this.props.openInfoModal();
  }

  render() {
    return (
      <footer className="Footer">
        <ConnectionStatus />

        <span className="Footer__link" onClick={ this.handleOpenInfo }>What is this?</span>
      </footer>
    );
  }
}

Footer.propTypes = {
  openInfoModal: PropTypes.func.isRequired,
}

export default Footer;
