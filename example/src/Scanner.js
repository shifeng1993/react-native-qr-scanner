import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {QRscanner} from 'react-native-qr-scanner';
import ImagePicker from 'react-native-image-picker';

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>{
          this.openPhoto();
        }}>
          <Text style={{marginTop: 20}}>打开相册识别二维码</Text>
        </TouchableOpacity>

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
          readerQR(path).then((data)=>{
              Alert.alert('识别结果',data);
          }).catch((err)=>{
            Alert.alert('识别失败');
          });
          
      }
      }
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});