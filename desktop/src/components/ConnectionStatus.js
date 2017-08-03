// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'react-autobind';

class ConnectionStatus extends Component {
  constructor() {
    super();

    autobind(this);
  }

  handleOpenKeyModal() {
    this.props.openKeyModal();
  }
  
  render() {
    const { socketConnected, reconnecting, remotePaired, remoteKey } = this.props;
    
    return (
      <div className="ConnectionStatus">
        { socketConnected ? (
            remotePaired ? (
              <p className="ConnectionStatus__text">
                <i className="fa fa-desktop" aria-hidden="true"></i>
                <i className="fa fa-exchange" aria-hidden="true"></i>
                <i className="fa fa-mobile" aria-hidden="true"></i>
                Paired with Mobile Device!
              </p>
            ) : (
              reconnecting ? (
                <p className="ConnectionStatus__text">
                  <i className="fa fa-desktop" aria-hidden="true"></i>
                  <i className="fa fa-plug" aria-hidden="true"></i>
                  <i className="fa fa-mobile" aria-hidden="true"></i>
                  Attempting to auto-reconnect with mobile device...
                </p>
              ) : (
                remoteKey === '' ? (
                  <p className="ConnectionStatus__text" onClick={ this.handleOpenKeyModal }>
                    <i className="fa fa-desktop" aria-hidden="true"></i>
                    <i className="fa fa-plug" aria-hidden="true"></i>
                    <i className="fa fa-mobile" aria-hidden="true"></i>
                    Generating pairing key...
                  </p>
                ) : (
                  <p className="ConnectionStatus__text--clickable" onClick={ this.handleOpenKeyModal }>
                    <i className="fa fa-desktop" aria-hidden="true"></i>
                    <i className="fa fa-plug" aria-hidden="true"></i>
                    <i className="fa fa-mobile" aria-hidden="true"></i>
                    Click to get your mobile pairing key!
                  </p>
                )
              )
            )
          ) : (
            <p className="ConnectionStatus__text">
              <i className="fa fa-desktop" aria-hidden="true"></i>
              <i className="fa fa-chain-broken" aria-hidden="true"></i>
              <i className="fa fa-mobile" aria-hidden="true"></i>
              Connecting to pairing server...
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
  reconnecting: PropTypes.bool.isRequired,
  remotePaired: PropTypes.bool.isRequired,
  remoteKey: PropTypes.string.isRequired,

  // UI
  openKeyModal: PropTypes.func.isRequired,
}

export default ConnectionStatus;
