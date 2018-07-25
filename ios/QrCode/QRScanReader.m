#import "QRScanReader.h"
#import <AVFoundation/AVFoundation.h>
#import <CoreImage/CoreImage.h>

@implementation QRScanReader
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(readerQR:(NSString *)fileUrl success:(RCTPromiseResolveBlock)success failure:(RCTResponseErrorBlock)failure){
  dispatch_sync(dispatch_get_main_queue(), ^{
    NSString *result = [self readerQR:fileUrl];
    if(result){
      success(result);
    }else{
      NSString *domain = @"yitang.xiao";
      NSString *desc = NSLocalizedString(@"没有相关二维码", @"");
      NSDictionary *userInfo = @{ NSLocalizedDescriptionKey : desc };
      NSError *error = [NSError errorWithDomain:domain
                                           code:404
                                       userInfo:userInfo];
      failure(error);
    }
  });
  
  
  
}

-(NSString*)readerQR:(NSString*)fileUrl{
  fileUrl = [fileUrl stringByReplacingOccurrencesOfString:@"file://" withString:@""];
  
  CIContext *context = [CIContext contextWithOptions:nil];
  
  // CIDetector(CIDetector可用于人脸识别)进行图片解析，声明一个CIDetector，并设定识别类型 CIDetectorTypeQRCode
  CIDetector *detector = [CIDetector detectorOfType:CIDetectorTypeQRCode context:context options:@{CIDetectorAccuracy:CIDetectorAccuracyHigh}];
  NSData *fileData = [[NSData alloc] initWithContentsOfFile:fileUrl];
  CIImage *ciImage = [CIImage imageWithData:fileData];
  NSArray *features = [detector featuresInImage:ciImage];
  if(!features || features.count==0){
    return nil;
  }
  //3. 获取扫描结果
  CIQRCodeFeature *feature = [features objectAtIndex:0];
  NSString *scannedResult = feature.messageString;
  return scannedResult;
}

@end
