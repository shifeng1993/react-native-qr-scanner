#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface QRScanReader : NSObject<RCTBridgeModule>
-(NSString*)readerQR:(NSString*)fileUrl;
@end
