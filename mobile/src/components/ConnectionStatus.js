// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

class ConnectionStatus extends Component {
  constructor() {
    super();

    autobind(this);
  }

  render() {
    const { socketConnected, remotePaired } = this.props;
    
    return (
      <div className="ConnectionStatus">
        { socketConnected ? (
            remotePaired ? (
              <p className="ConnectionStatus__text">
                <i className="fa fa-desktop" aria-hidden="true"></i>
                <i className="fa fa-exchange" aria-hidden="true"></i>
                <i className="fa fa-mobile" aria-hidden="true"></i>
                Paired with Desktop Site!
              </p>
            ) : (
              <p className="ConnectionStatus__text">
                <i className="fa fa-desktop" aria-hidden="true"></i>
                <i className="fa fa-plug" aria-hidden="true"></i>
                <i className="fa fa-mobile" aria-hidden="true"></i>
                Ready to pair with Desktop Site...
              </p>
            )
          ) : (
            <p className="ConnectionStatus__text">
              <i className="fa fa-desktop" aria-hidden="true"></i>
              <i className="fa fa-chain-broken" aria-hidden="true"></i>
              <i className="fa fa-mobile" aria-hidden="true"></i>
              No connection to Desktop Site
            </p>
          )
        }
      </div>
    );
  }
}

ConnectionStatus.propTypes = {
  // State
  // Socket
  socketConnected: PropTypes.bool.isRequired,
  remotePaired: PropTypes.bool.isRequired,
}

export default ConnectionStatus;
