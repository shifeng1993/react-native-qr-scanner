# react-native-qr-scanner

```bash
yarn add git+https://github.com/ihor-linovitsky/react-native-qr-scanner.git
or 
npm install git+https://github.com/ihor-linovitsky/react-native-qr-scanner.git

or add next line to package.json 
"dependencies": {
  "react-native-qr-scanner": "git+https://github.com/ihor-linovitsky/react-native-qr-scanner.git",
  ...
}
run
npm install
```
#then run
react-native link react-native-qr-scanner
#also do
cd ios
pod install
```
```bash
#then 
react-native run-android
or
react-native run-ios

```

```bash
react-native link react-native-camera && react-native-qr-scanner
```

- ios `ios/projectName/Info.plist`:
```xml
<key>NSCameraUsageDescription</key>
<string/>
<key>NSPhotoLibraryUsageDescription</key>
<string/>
<key>NSMicrophoneUsageDescription</key>
<string/>
<key>NSPhotoLibraryAddUsageDescription</key>
<string/>
```
- android `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.VIBRATE"/>
```

https://github.com/react-native-community/react-native-camera/blob/master/docs/GradleUpgradeGuide.md

#Example
```javascript
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {QRscanner} from 'react-native-qr-scanner';

export default class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flashMode: false,
      zoom: 0.2
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <QRscanner onRead={this.onRead} renderBottomView={this.bottomView} flashMode={this.state.flashMode} zoom={this.state.zoom} finderY={50}/>
      </View>
    );
  }
  bottomView = ()=>{
    return(
    <View style={{flex:1,flexDirection:'row',backgroundColor:'#0000004D'}}>
      <TouchableOpacity style={{flex:1,alignItems:'center', justifyContent:'center'}} onPress={()=>this.setState({flashMode:!this.state.flashMode})}>
        <Text style={{color:'#fff'}}>йоба-боба-функция</Text>
      </TouchableOpacity>
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
```

### QRreader
```javascript
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
          <Text style={{marginTop: 20}}>просто кек бля</Text>
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
              message: 'message',
              data: data
            }});
            setTimeout(() => {
              this.setState({reader: {
                message: null,
                data: null
              }})
            }, 10000);
          }).catch((err)=>{
            this.setState({reader: {
              message: 'message',
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
```


### QRscanner
| method             |  type   | example        | 备注 |
| -------------      | ------- | -------------  | ------------- |
| isRepeatScan       | boolean    | false          |   是否允许重复扫描  |
| zoom          | number    | 0          |   相机焦距 范围0-1  |
| flashMode          | bool    | false          |   开启手电筒  |
| onRead             | func    | (res)=>{}      | 扫描回调 |
| maskColor          | string  | '#0000004D'    | 遮罩层颜色  |
| borderColor        | string  | '#000000'      | 边框颜色  |
| cornerColor        | string  | '#22ff00'      | 扫描框转角的颜色  |
| borderWidth        | number  | 0              | 扫描框的边框宽度  |
| cornerBorderWidth  | number  | 4              | 扫描框转角的border宽度  |
| cornerBorderLength | number  | 20             | 扫描框转角的宽度高度  |
| rectHeight         | number  | 200            | 扫描框高度  |
| rectWidth          | number  | 200            | 扫描框宽度  |
| finderX             | number  | 0            | 扫描框X轴偏移量  |
| finderY             | number  | 0            | 扫描框Y轴偏移量  |
| isCornerOffset     | bool    | true           | 边角是否偏移  |
| cornerOffsetSize   | number  | 1              | 偏移量  |
| bottomHeight       | number  | 100            | 底部预留高度  |
| scanBarAnimateTime | number  | 2500           | 扫描线时间  |
| scanBarColor       | string  | '#22ff00'      | 扫描线颜色  |
| scanBarImage       | any     | null           | 扫描线图片  |
| scanBarHeight      | number  | 1.5            | 扫描线高度  |
| scanBarMargin      | number  | 6              | 扫描线左右margin  |
| hintText           | string  | '将二维码/条码放入框内，即可自动扫描'| 提示字符串  |
| hintTextStyle      | object  | {color: '#fff',fontSize: 14,backgroundColor: 'transparent'} | 提示字符串样式  |
| hintTextPosition   | number  | 130            | я хуй знает что в этой колонке написано шот по китайски сами разбирайтесь))) |
| renderTopView      | func    | () =>{}        | render顶部View  |
| renderBottomView   | func    | ()=><View style={{flex:1,backgroundColor:'#0000004D'}}/> | render底部View  |
| isShowScanBar      | bool    | true           | 是否显示扫描线  |
| topViewStyle       | object  | null           | render顶部容器样式  |
| bottomViewStyle    | object  | null           | render底部容器样式  |    

