// Actions
// import { REHYDRATE } from 'redux-persist/constants'
const SAVE_SOCKET_CONNECTION  = 'squirtlefacts/sockets/SAVE_SOCKET_CONNECTION',
      SET_REMOTE_PAIRED       = 'squirtlefacts/sockets/SET_REMOTE_PAIRED',
      SET_REMOTE_DISCONNECTED = 'squirtlefacts/sockets/SET_REMOTE_DISCONNECTED';

// Action Creators
export function saveSocketConnection(socket) {
  return {
    type: SAVE_SOCKET_CONNECTION,
    socket,
  }
}

export function setRemotePaired() {
  return {
    type: SET_REMOTE_PAIRED,
  }
}

export function setRemoteDisconnected() {
  return {
    type: SET_REMOTE_DISCONNECTED,
  }
}

// Reducer
export default function(state = {}, action) {
  switch (action.type) {
    case SAVE_SOCKET_CONNECTION: {
      return {
        ...state,
        socket: action.socket,
        socketConnected: true,
      }
    }

    case SET_REMOTE_PAIRED: {
      return {
        ...state,
        remotePaired: true,
      }
    }

    case SET_REMOTE_DISCONNECTED: {
      return {
        ...state,
        remotePaired: false,
      }
    }

    /*
    case REHYDRATE: {
      return {
        ...state,
        firstConnection: false,
      }
    }
    */

    default: {
      return state;
    }
  }
}
