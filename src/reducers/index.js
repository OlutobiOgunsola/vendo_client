import { combineReducers } from 'redux';

import user from './user.js';
import alerts from './alerts.js';

export default combineReducers({ user, alerts });
