import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import QRScannerView from './QRScannerView';

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <QRScannerView onRead={this.onRead} torchMode={true}/>
      </View>
    );
  }

  onRead = ({data}) => {
    alert(data);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});