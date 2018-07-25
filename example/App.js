import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from 'react-navigation';

import Home from './src/Home'
import Scanner from './src/Scanner'
import Reader from './src/Reader'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Scanner: {
    screen: Scanner
  },
  Reader: {
    screen: Reader
  }
}, {
  initialRouteName: 'Home',
});

export default class App extends Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
