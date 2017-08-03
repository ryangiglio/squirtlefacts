// Redux
import { applyMiddleware, createStore, compose } from "redux";
// import { persistStore, autoRehydrate } from 'redux-persist'
import rootReducer from "../ducks";

// Config
import defaultState from './defaultState';

// Compose with Redux dev tools for development
const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

const store = createStore(
  rootReducer,
  defaultState,
  composeEnhancers(
    applyMiddleware(),
    // autoRehydrate()
  )
);

/*
persistStore(store, { whitelist: ['squirtle'] }, () => {
  //
})
*/

export default store;
