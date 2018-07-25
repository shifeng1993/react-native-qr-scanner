import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {QRreader} from 'react-native-qr-scanner';
import ImagePicker from 'react-native-image-picker';

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reader: {
        message: null,
        data: null
      }
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{
          this.openPhoto();
        }}>
          <Text style={{marginTop: 20}}>打开相册识别二维码</Text>
        </TouchableOpacity>
        <View>
        {!this.state.reader? <Text>{!this.state.reader.message?'':`${this.state.reader.message}`}</Text>: <Text>{!this.state.reader.message?'':`${this.state.reader.message}:${this.state.reader.data}`}</Text>}
        </View>
      </View>
    );
  }
  
  openPhoto(){
    console.log('ImagePicker');
    ImagePicker.launchImageLibrary({}, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        if(response.uri){
          var path = response.path;
          if(!path){
              path = response.uri;
          }
          QRreader(path).then((data)=>{
            this.setState({reader: {
              message: '识别成功',
              data: data
            }});
            // 十秒后自动清空
            setTimeout(() => {
              this.setState({reader: {
                message: null,
                data: null
              }})
            }, 10000);
          }).catch((err)=>{
            this.setState({reader: {
              message: '识别失败',
              data: null
            }});
          });
          
      }
      }
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});