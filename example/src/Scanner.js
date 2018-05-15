import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {QRscanner} from 'react-native-qr-scanner';

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <QRscanner onRead={this.onRead} finderY={50}/>
      </View>
    );
  }

  onRead = (res) => {
    console.log(res);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});