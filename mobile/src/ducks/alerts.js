// Actions
const ADD_ALERT        = 'squirtlefacts/alerts/ADD_ALERT',
      CLEAR_ALERT      = 'squirtlefacts/alerts/CLEAR_ALERT',
      CLEAR_ALL_ALERTS = 'squirtlefacts/alerts/CLEAR_ALL_ALERTs';

// Action Creators
export function addAlert(alertType, text) {
  return {
    type: ADD_ALERT,
    alertType,
    text,
  }
}

export function clearAlert(index) {
  return {
    type: CLEAR_ALERT,
    index,
  }
}

export function clearAllAlerts() {
  return {
    type: CLEAR_ALL_ALERTS,
  }
}

// Reducer
export default function(state = [], action) {
  switch (action.type) {
    case ADD_ALERT: {
      return [
        ...state,
        {
          type: action.alertType,
          text: action.text,
        }
      ]
    }

    case CLEAR_ALERT: {
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    }

    case CLEAR_ALL_ALERTS: {
      return [];
    }

    default: {
      return state;
    }
  }
}
