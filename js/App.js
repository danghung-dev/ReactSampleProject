'use strict';
 var AppState = require('AppState');
import React, { Component } from 'react';
import {
  Alert,
  TouchableOpacity,
  Image,
  View,
  AppRegistry,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  AsyncStorage
} from 'react-native';

import PushNotificationController from './PushNotificationController'
var { connect } = require('react-redux');
var {serverURL, enableParse} = require('./env');
var {
  skipLogin,

} = require('./actions');

var App = React.createClass({
  componentDidMount: function() {
    AppState.addEventListener('change', this.handleAppStateChange);

    // TODO: Make this list smaller, we basically download the whole internet
    this.props.dispatch(skipLogin());
  },
  componentWillUnmount: function() {

  },

  handleAppStateChange: function(appState) {
    if (appState === 'active') {
      this.props.dispatch(skipLogin());
    }
  },

  render: function() {
    if (enableParse) {
      return (
        <View style={styles.container}>
        <Text> Hello world ! </Text>
        <PushNotificationController />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text> Hello world ! </Text>
        </View>
      );
    }

  },
});
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
function select(store) {
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}
module.exports = connect(select)(App);
