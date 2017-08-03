// React
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import Alert from './Alert';

class Alerts extends Component {

  render() {
    const { alerts, clearAlert } = this.props;
    
    return (
      <div className="Alerts">
        { alerts.map((alert, index) =>
          <Alert
            key={ index }
            text={ alert.text }
            index={ index }
            clearAlert= { clearAlert } />
        )}
      </div>
    );
  }
}

Alerts.propTypes = {
  // State
  alerts: PropTypes.array.isRequired,

  // Dispatch
  clearAlert: PropTypes.func.isRequired,
}

export default Alerts;
