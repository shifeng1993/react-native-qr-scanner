import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import QRScannerView from 'react-native-qr-scanner';

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <QRScannerView onRead={this.onRead}/>
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