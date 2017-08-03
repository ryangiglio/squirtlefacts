import defaultState from '../store/defaultState';

// Actions
const RENAME         = 'squirtlefacts/squirtle/RENAME',
      LEVEL_UP       = 'squirtlefacts/squirtle/LEVEL_UP',
      LEARN_MOVE     = 'squirtlefacts/squirtle/LEARN_MOVE',
      EVOLVE         = 'squirtlefacts/squirtle/EVOLVE',
      RESET_SQUIRTLE = 'squirtlefacts/squirtle/RESET_SQUIRTLE';

// Action Creators
export function rename(name) {
  return {
    type: RENAME,
    name,
  }
}

export function levelUp() {
  return {
    type: LEVEL_UP,
  }
}

export function learnMove(name) {
  return {
    type: LEARN_MOVE,
    name,
  }
}

export function evolve(newSpecies) {
  return {
    type: EVOLVE,
    newSpecies,
  }
}

export function resetSquirtle() {
  return {
    type: RESET_SQUIRTLE,
  }
}

// Reducer
export default function(state = {}, action) {
  switch (action.type) {
    case RENAME: {
      return {
        ...state,
        name: action.name,
      }
    }

    case LEVEL_UP: {
      return {
        ...state,
        level: state.level + 1,
      }
    }

    case LEARN_MOVE: {
      return {
        ...state,
        moves: [
          ...state.moves,
          action.name,
        ],
      }
    }

    case EVOLVE: {
      return {
        ...state,
        species: action.newSpecies,
      }
    }

    case RESET_SQUIRTLE: {
      return defaultState.squirtle;
    }

    default: {
      return state;
    }
  }
}

