// Actions
const SAVE_SOCKET_CONNECTION   = 'squirtlefacts/sockets/SAVE_SOCKET_CONNECTION',
      SET_RECONNECTING_STARTED = 'squirtlefacts/sockets/SET_RECONNECTING_STARTED',
      SET_RECONNECTING_STOPPED = 'squirtlefacts/sockets/SET_RECONNECTING_STOPPED',
      SAVE_REMOTE_KEY          = 'squirtlefacts/sockets/SAVE_REMOTE_KEY',
      SET_REMOTE_PAIRED        = 'squirtlefacts/sockets/SET_REMOTE_PAIRED',
      SET_REMOTE_DISCONNECTED  = 'squirtlefacts/sockets/SET_REMOTE_DISCONNECTED',
      SET_GAME_RESUMED         = 'squirtlefacts/sockets/SET_GAME_RESUMED';

// Action Creators
export function saveSocketConnection(socket) {
  return {
    type: SAVE_SOCKET_CONNECTION,
    socket,
  }
}

export function setReconnectingStarted() {
  return {
    type: SET_RECONNECTING_STARTED,
  }
}

export function setReconnectingStopped() {
  return {
    type: SET_RECONNECTING_STOPPED,
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

export function setGameResumed() {
  return {
    type: SET_GAME_RESUMED,
  }
}

export function saveRemoteKey(key) {
  return {
    type: SAVE_REMOTE_KEY,
    key,
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

    case SET_RECONNECTING_STARTED: {
      return {
        ...state,
        reconnecting: true,
      }
    }

    case SET_RECONNECTING_STOPPED: {
      return {
        ...state,
        reconnecting: false,
      }
    }

    case SAVE_REMOTE_KEY: {
      return {
        ...state,
        remoteKey: action.key,
        firstPairing: false,
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

    case SET_GAME_RESUMED: {
      return {
        ...state,
        gameResumed: true,
      }
    }

    default: {
      return state;
    }
  }
}
