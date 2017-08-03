import { combineReducers } from 'redux';

import sockets from './sockets';
import squirtle from './squirtle';
import alerts from './alerts';
import ui from './ui';

const rootReducer = combineReducers({
  sockets,
  squirtle,
  alerts,
  ui,
});

export default rootReducer;
