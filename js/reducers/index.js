/**
 *
 *
 * @flow
 */

'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
  user: require('./user'),
  notifications: require('./notifications'),
});
