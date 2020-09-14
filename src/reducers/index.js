import { combineReducers } from 'redux';

import user from '../store/user.js';
import review from './review.js';
import transaction from './transaction.js';

export default combineReducers({ user, review, transaction });
