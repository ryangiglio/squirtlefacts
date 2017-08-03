// Redux
import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, autoRehydrate } from 'redux-persist'
import defaultState from './defaultState';
import rootReducer from "../ducks";
// import { addAlert } from '../ducks/alerts';

// Compose for Redux Dev Tools
const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(
    applyMiddleware(),
    autoRehydrate()
  )
);

// Save Squirtle to local storage
persistStore(store, { whitelist: ['squirtle'] }, () => {
  const { /* name, */ level } = store.getState().squirtle;

  if (level > 0) {
    // store.dispatch(addAlert('rehydrate', `Thanks for coming back! ${name} missed you!`));
  }
})
//  .purge();

export default store;
