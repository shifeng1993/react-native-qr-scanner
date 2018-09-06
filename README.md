# react-native-qr-scanner
[![NPM Version](https://img.shields.io/npm/v/react-native-qr-scanner.svg?style=flat)](https://www.npmjs.com/package/react-native-qr-scanner)
  [![License](http://img.shields.io/npm/l/react-native-qr-scanner.svg?style=flat)](https://github.com/shifeng1993/react-native-qr-scanner/blob/master/LICENSE)

一个react-native的二维码扫描组件，支持扫描区域的限制以及扫描区域的偏移。

## 安装步骤：

### 安装依赖
```bash
yarn add react-native-camera react-native-qr-scanner
```

### link依赖到native 
```bash
react-native link react-native-camera && react-native-qr-scanner
```

### 添加相机权限：
- ios在 `ios/projectName/Info.plist`:
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
- android在 `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.VIBRATE"/>
```

#### 修复相机组件找不到google()方法的错误

https://github.com/react-native-community/react-native-camera/blob/master/docs/GradleUpgradeGuide.md

## 使用组件

### 扫描
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
        <Text style={{color:'#fff'}}>点我开启/关闭手电筒</Text>
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

### 识别
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
```

## 运行示例
```bash
$ cd example
$ yarn
$ react-native run-ios  或者 $ react-native run-android  
```
示例中代码已link过，所以不用link

### QRscanner
| 属性                | 类型    | 默认值          | 备注 |
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
| hintTextPosition   | number  | 130            | 提示字符串距离容器底部的值  |
| renderTopView      | func    | () =>{}        | render顶部View  |
| renderBottomView   | func    | ()=><View style={{flex:1,backgroundColor:'#0000004D'}}/> | render底部View  |
| isShowScanBar      | bool    | true           | 是否显示扫描线  |
| topViewStyle       | object  | null           | render顶部容器样式  |
| bottomViewStyle    | object  | null           | render底部容器样式  |    

### QRreader
QRreader(path:uri)是一个promise对象，接受一个uri图片路径参数，
返回成功识别的对象，失败则返回错误


## 历史版本特性
#### 1.3.2  因android扫描区域计算有诸多问题，所以注释掉android计算扫描区域，恢复android设备的全屏扫描。
#### 1.3.1  修复ios打包发生的找不到库的错误,降低相册二维码识别的ios最低版本支持
#### 1.3.0  修复android扫描的一个bug，加入相册二维码识别，感谢lewin大神的开源二维码识别。
#### 1.2.4  限制扫码类型，修复android报错
#### 1.2.2  添加是否允许重复扫描的api
#### 1.2.1  修复android的报错以及android扫描区域的bug
#### 1.2.0  修改底层依赖相机组件，添加扫描区域，并设置XY轴偏移量
#### 1.1.3  完善文档
#### 1.1.2  git保留demo示例，npm包去掉demo示例
#### 1.1.1  修改文档错误地方，新增demo示例
#### 1.1.0  修复bug，新增手电筒api
#### 1.0.0  上传基础组件
