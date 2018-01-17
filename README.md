# QRScannerView
一个二维码扫描组件。

## 使用步骤：

1. 添加依赖 ，package.json中添加：
  ```json
  "react-native-camera": "github:fbacker/react-native-camera#barcode-finder"
  ```

2. 安装依赖
  ```bash
  yarn
  ```

3. link依赖库 
  ```bash
  react-native link react-native-camera
  ```

4. 添加相机权限：
- ios在Info.plist:
```xml
<key>NSCameraUsageDescription</key>
<string/>
```
- android在AndroidManifest.xml:
```xml
<uses-permission android:name="android.permission.VIBRATE"/>
```

5. 安装
  ```bash
  yarn add react-native-qr-scanner
  ```

6. 使用：
```javascript
import QRScannerView from 'react-native-qr-scanner';
```

## props:
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

