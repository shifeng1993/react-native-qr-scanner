import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View
        style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate('Scanner')}>
          <Text>点击跳到扫描二维码页面</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.props.navigation.navigate('Reader')}>
          <Text>点击跳到读取二维码页面</Text>
        </TouchableOpacity>
      </View>
    );
  }
}