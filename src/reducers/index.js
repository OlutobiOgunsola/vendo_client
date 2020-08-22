import { combineReducers } from 'redux';

import user from './user.js';
import review from './review.js';

export default combineReducers({ user, review });
