# QRScannerView
一个二维码扫描组件。

## 安装步骤：

1. 添加依赖 ，package.json中添加：
  ```json
  "react-native-camera": "github:fbacker/react-native-camera#barcode-finder"
  ```

2. 安装依赖
  ```bash
  yarn add react-native-qr-scanner
  ```
  注： add时，会自动安装全部依赖，所以不用担心相机组件没有安装上

3. link依赖库 
  ```bash
  react-native link react-native-camera
  ```

4. 添加应用权限：
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

## 使用组件

请看example文件夹中示例代码
运行示例
```bash
$ cd example
$ yarn
$ react-native run-ios  或者 $ react-native run-android  
```
示例中代码已link过，所以不用link

## props:
- torchMode:bool                开启手电筒，默认false 关闭

- onRead:func,                  扫描回调  (res)=>{}

- maskColor: string,            遮罩层颜色

- borderColor: string,          边框颜色

- cornerColor: string,          扫描框转角的颜色

- borderWidth: number,          扫描框的边框宽度

- cornerBorderWidth: number,    扫描框转角的border宽度   

- cornerBorderLength: number,   扫描框转角的宽度高度

- rectHeight: number,           扫描框高度

- rectWidth: number,            扫描框宽度

- isLoading: bool,              渲染加载动画

- isCornerOffset: bool,         边角是否偏移

- cornerOffsetSize: number,     偏移量

- bottomHeight: number,         底部预留高度(默认0)

- scanBarAnimateTime: number,   扫描线时间

- scanBarColor: string,         扫描线颜色

- scanBarImage: any,            扫描线图片

- scanBarHeight: number,        扫描线高度

- scanBarMargin: number,        扫描线左右margin

- hintText: string,             提示字符串

- hintTextStyle: object,        提示字符串样式

- hintTextPosition: number,     提示字符串距离容器底部的值

- renderTopView: func,          render顶部View

- renderBottomView: func,       render底部View

- isShowScanBar: bool,          是否显示扫描线

- topViewStyle: object          render顶部容器样式

- bottomViewStyle: object       render底部容器样式


## 历史版本特性
#### 1.0.0  上传基础组件
#### 1.0.1  修复bug
#### 1.0.2  修复bug
#### 1.1.0  修复bug，新增手电筒api
#### 1.1.1  修改文档错误地方，新增demo示例
#### 1.1.2  git保留demo示例，npm包去掉demo示例
