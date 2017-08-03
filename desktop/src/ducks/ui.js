import facts from '../data/facts';

// Actions
const CHANGE_FACT        = 'squirtlefacts/ui/CHANGE_FACT',
      OPEN_INFO_MODAL    = 'squirtlefacts/ui/OPEN_INFO_MODAL',
      CLOSE_INFO_MODAL   = 'squirtlefacts/ui/CLOSE_INFO_MODAL',
      OPEN_KEY_MODAL     = 'squirtlefacts/ui/OPEN_KEY_MODAL',
      CLOSE_KEY_MODAL    = 'squirtlefacts/ui/CLOSE_KEY_MODAL',
      OPEN_PAIRED_MODAL  = 'squirtlefacts/ui/OPEN_PAIRED_MODAL',
      CLOSE_PAIRED_MODAL = 'squirtlefacts/ui/CLOSE_PAIRED_MODAL';

// Action Creators
export function changeFact() {
  return {
    type: CHANGE_FACT,
  }
}

export function openInfoModal() {
  return {
    type: OPEN_INFO_MODAL,
  }
}

export function closeInfoModal() {
  return {
    type: CLOSE_INFO_MODAL,
  }
}

export function openKeyModal() {
  return {
    type: OPEN_KEY_MODAL,
  }
}

export function closeKeyModal() {
  return {
    type: CLOSE_KEY_MODAL,
  }
}

export function openPairedModal() {
  return {
    type: OPEN_PAIRED_MODAL,
  }
}

export function closePairedModal() {
  return {
    type: CLOSE_PAIRED_MODAL,
  }
}

// Reducer
export default function(state = {}, action) {
  switch (action.type) {
    case CHANGE_FACT: {
      let newFactIndex = Math.floor(Math.random() * facts.length);

      // Keep generating until they're not the same
      while (newFactIndex === state.currFactIndex) {
        newFactIndex = Math.floor(Math.random() * facts.length);
      }
      
      return {
        ...state,
        currFactIndex: newFactIndex,
      }
    }
    
    case OPEN_INFO_MODAL: {
      return {
        ...state,
        infoModalOpen: true,
      }
    }
    
    case CLOSE_INFO_MODAL: {
      return {
        ...state,
        infoModalOpen: false,
      }
    }
    
    case OPEN_KEY_MODAL: {
      return {
        ...state,
        keyModalOpen: true,
      }
    }
    
    case CLOSE_KEY_MODAL: {
      return {
        ...state,
        keyModalOpen: false,
      }
    }
    
    case OPEN_PAIRED_MODAL: {
      return {
        ...state,
        pairedModalOpen: true,
      }
    }
    
    case CLOSE_PAIRED_MODAL: {
      return {
        ...state,
        pairedModalOpen: false,
      }
    }
    
    default: {
      return state;
    }
  }
}
