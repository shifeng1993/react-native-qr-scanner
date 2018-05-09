import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, TabNavigator} from 'react-navigation';

import Home from './src/Home'
import Scanner from './src/Scanner'

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  },
  Scanner: {
    screen: Scanner
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
