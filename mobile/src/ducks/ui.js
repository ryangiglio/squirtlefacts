// Actions
const SHOW_RENAME = 'squirtlefacts/ui/SHOW_RENAME',
      HIDE_RENAME = 'squirtlefacts/ui/HIDE_RENAME';

// Action Creators
export function showRename() {
  return {
    type: SHOW_RENAME,
  }
}

export function hideRename() {
  return {
    type: HIDE_RENAME,
  }
}

// Reducer
export default function(state = {}, action) {
  switch (action.type) {
    case SHOW_RENAME: {
      return {
        ...state,
        rename: true,
      }
    }

    case HIDE_RENAME: {
      return {
        ...state,
        rename: false,
      }
    }
    
    default: {
      return state;
    }
  }
}
