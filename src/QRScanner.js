import React, {PureComponent} from 'react';
import { RNCamera } from 'react-native-camera';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  Image,
  Vibration,
  Platform,
  PixelRatio,
  StatusBar
} from 'react-native';

import QRScannerView from './QRScannerView'
const pixelRatio = PixelRatio.get()

/**
 * 扫描界面
 */
export default class QRScanner extends PureComponent {
  constructor(props) {
    super(props);
    //通过这句代码屏蔽 YellowBox
    console.disableYellowBox = true;
    this.state = {
      scanning: false,
      barCodeSize: {}
    }
  }

  static defaultProps =  {
    onRead: ()=>{},
    renderTopView: () =>{},
    renderBottomView: ()=><View style={{flex:1,backgroundColor:'#0000004D'}}/>,
    rectHeight: 200,
    rectWidth: 200,
    flashMode: false,   // 手电筒模式
    finderX: 0,         // 取景器X轴偏移量
    finderY: 0,         // 取景器Y轴偏移量
    zoom: 0.2,          // 缩放范围 0 - 1
    translucent: false,
    isRepeatScan: false
  }
  
  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <RNCamera
         style={{
          flex: 1
        }}
          onBarCodeRead={this._handleBarCodeRead}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          flashMode={!this.props.flashMode ? RNCamera.Constants.FlashMode.off : RNCamera.Constants.FlashMode.torch} 
          zoom={this.props.zoom}>
          <View style={[styles.topButtonsContainer, this.props.topViewStyle]}>
            {this.props.renderTopView()}
          </View>
          <QRScannerView
            maskColor={this.props.maskColor}
            cornerColor={this.props.cornerColor}
            borderColor={this.props.borderColor}
            rectHeight={this.props.rectHeight}
            rectWidth={this.props.rectWidth}
            borderWidth={this.props.borderWidth}
            cornerBorderWidth={this.props.cornerBorderWidth}
            cornerBorderLength={this.props.cornerBorderLength}
            cornerOffsetSize={this.props.cornerOffsetSize}
            isCornerOffset={this.props.isCornerOffset}
            bottomHeight={this.props.bottomHeight}
            scanBarAnimateTime={this.props.scanBarAnimateTime}
            scanBarColor={this.props.scanBarColor}
            scanBarHeight={this.props.scanBarHeight}
            scanBarMargin={this.props.scanBarMargin}
            hintText={this.props.hintText}
            hintTextStyle={this.props.hintTextStyle}
            scanBarImage={this.props.scanBarImage}
            hintTextPosition={this.props.hintTextPosition}
            isShowScanBar={this.props.isShowScanBar}
            finderX={this.props.finderX}
            finderY={this.props.finderY}
            returnSize={this.barCodeSize}/>
          <View style={[styles.bottomButtonsContainer, this.props.bottomViewStyle]}>
            {this.props.renderBottomView()}
          </View>
        </RNCamera>
      </View>
    );
  }

  isShowCode = false;

  barCodeSize = (size) => this.setState({barCodeSize:size})

  returnMax= (a,b) =>  a > b ? a : b

  returnMin= (a,b) =>  a < b ? a : b

  iosBarCode = (e) => {
    let x = Number(e.bounds.origin.x)
    let y = Number(e.bounds.origin.y)
    let width = e.bounds.size.width
    let height = e.bounds.size.height
    let viewMinX = this.state.barCodeSize.x - this.props.finderX
    let viewMinY = this.state.barCodeSize.y - this.props.finderY
    let viewMaxX = this.state.barCodeSize.x + this.state.barCodeSize.width - width - this.props.finderX
    let viewMaxY = this.state.barCodeSize.y + this.state.barCodeSize.height - height - this.props.finderY
    if ((x > viewMinX && y > viewMinY) && (x < viewMaxX && y < viewMaxY)) {
      if (this.props.isRepeatScan) {
        Vibration.vibrate();
        this.props.onRead(e)
      } else {
        if (!this.isShowCode) {
          this.isShowCode = true;
          Vibration.vibrate();
          this.props.onRead(e)
        }
      }
    }
  }

  androidBarCode = (e) => {
    // if (!e.bounds[0] || !e.bounds[1] || !e.bounds[2] || !e.bounds[3]) return null;
    // const leftBottom = {x: e.bounds[0].x / pixelRatio, y: e.bounds[0].y / pixelRatio}
    // const leftTop= {x: e.bounds[1].x / pixelRatio, y: e.bounds[1].y / pixelRatio}
    // const rightTop = {x: e.bounds[2].x / pixelRatio, y: e.bounds[2].y / pixelRatio}
    // const rightBottom = {x: e.bounds[3].x / pixelRatio, y: e.bounds[3].y / pixelRatio}
    // let x = this.returnMin(leftTop.x, leftBottom.x);
    // let y = this.returnMin(leftTop.y, rightTop.y);
    // let width = this.returnMax(rightTop.x - leftTop.x, rightBottom.x - leftBottom.x)
    // let height = this.returnMax(leftBottom.y - leftTop.y , rightBottom.y - rightTop.y)
    // let viewMinX = this.state.barCodeSize.x - this.props.finderX * 4 / pixelRatio - (this.props.finderX > 0 ? this.props.finderX/10 : 0)
    // let viewMinY = this.state.barCodeSize.y - this.props.finderY * 4 / pixelRatio - (this.props.translucent ? 0 : StatusBar.currentHeight)*2/pixelRatio - (this.props.finderY > 0 ? this.props.finderY/3 : this.props.finderY/10*(-1))
    // let viewMaxX = this.state.barCodeSize.x + 20 + this.state.barCodeSize.width*2 / pixelRatio - width - this.props.finderX *4/pixelRatio - (this.props.finderX < 0 ? 0 : this.props.finderX/5)
    // let viewMaxY = this.state.barCodeSize.y + this.state.barCodeSize.height*2 / pixelRatio - height - this.props.finderY *4/pixelRatio  - (this.props.translucent ? 0 : StatusBar.currentHeight)*2/pixelRatio - (this.props.finderY < 0 ? this.props.finderY/5 : 0 )
    // if(x&&y) {
    //   if ((x > viewMinX && y > viewMinY) && (x < viewMaxX && y < viewMaxY)) {
    //     if (this.props.isRepeatScan) {
    //       Vibration.vibrate();
    //       this.props.onRead(e)
    //     } else {
    //       if (!this.isShowCode) {
    //         this.isShowCode = true;
    //         Vibration.vibrate();
    //         this.props.onRead(e)
    //       }
    //     }
    //   }
    // }

     // 以下是不限制扫描区域
    if (this.props.isRepeatScan) {
      Vibration.vibrate();
      this.props.onRead(e)
    } else {
      if (!this.isShowCode) {
        this.isShowCode = true;
        Vibration.vibrate();
        this.props.onRead(e)
      }
    }
  }

  _handleBarCodeRead = (e) => {
    switch (Platform.OS) {
      case 'ios':
    this.iosBarCode(e);
        break;
      case 'android':
        this.androidBarCode(e);
        break;
      default:
        break;
    }
  }
}

const styles = StyleSheet.create({
  topButtonsContainer: {
    position: 'absolute',
    height: 100,
    top: 0,
    left: 0,
    right: 0
  },
  bottomButtonsContainer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    left: 0,
    right: 0
  }
});

QRScanner.propTypes = {
  isRepeatScan: PropTypes.bool,
  onRead: PropTypes.func,
  maskColor: PropTypes.string,
  borderColor: PropTypes.string,
  cornerColor: PropTypes.string,
  borderWidth: PropTypes.number,
  cornerBorderWidth: PropTypes.number,
  cornerBorderLength: PropTypes.number,
  rectHeight: PropTypes.number,
  rectWidth: PropTypes.number,
  isCornerOffset: PropTypes.bool, //边角是否偏移
  cornerOffsetSize: PropTypes.number,
  bottomHeight: PropTypes.number,
  scanBarAnimateTime: PropTypes.number,
  scanBarColor: PropTypes.string,
  scanBarImage: PropTypes.any,
  scanBarHeight: PropTypes.number,
  scanBarMargin: PropTypes.number,
  hintText: PropTypes.string,
  hintTextStyle: PropTypes.object,
  hintTextPosition: PropTypes.number,
  renderTopView: PropTypes.func,
  renderBottomView: PropTypes.func,
  isShowScanBar: PropTypes.bool,
  topViewStyle: PropTypes.object,
  bottomViewStyle: PropTypes.object,
  flashMode: PropTypes.bool,
  finderX: PropTypes.number,
  finderY: PropTypes.number,
  zoom: PropTypes.number,
  translucent: PropTypes.bool
}