import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import combinedReducers from '../reducers/';

const store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
