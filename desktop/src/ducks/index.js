import { combineReducers } from 'redux';

import sockets from './sockets';
import ui from './ui';

const rootReducer = combineReducers({
  sockets,
  ui,
});

export default rootReducer;
