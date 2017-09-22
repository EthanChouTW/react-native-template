//
//  HBPrinter.m
//  NDCHealth
//
//  Created by EthanChou on 2017/6/27.
//  Copyright © 2017年 Honestbee. All rights reserved.
//

#import "HBPrinter.h"
#if TARGET_IPHONE_SIMULATOR
#import <MockPrinterLibs/MockPrinterLibs.h>
#else
#import <PrinterLibs/PrinterLibs.h>
#endif
#import <WebKit/WebKit.h>
#import <React/RCTConvert.h>
#import <React/RCTScrollView.h>
#import <React/RCTWebView.h>
#import <React/RCTUIManager.h>
#import <React/RCTBridge.h>
#import "HBPeripheral.h"

@interface HBPrinter()<BLEPrintingDiscoverDelegate, BLEPrintingReceiveDelegate, BLEPrintingOpenDelegate,BLEPrintingDisconnectDelegate>

@property NETPrinting * myNet;
@property BLEPrinting * myBle;
@property POSPrinting * myPos;
@property LabelPrinting * myLabel;
@property NSMutableArray * arrayPeripheral;
@property dispatch_queue_t myQueue;

@end

@implementation HBPrinter
RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue
{
  return RCTGetUIManagerQueue();
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    _myBle = [[BLEPrinting alloc] init];
    _myBle.myOpenDelegate = self;
    _myBle.myDisconnectDelegate = self;
    _myBle.myDiscoverDelegate = self;
    _myBle.myReceiveDelegate = self;
    _myPos = [[POSPrinting alloc] init];
    [_myPos POS_SetPrintSpeed:1000];
    _myLabel = [[LabelPrinting alloc] init];
    _arrayPeripheral = [[NSMutableArray alloc] init];
    _myQueue = dispatch_queue_create("BLEPrinting IO Queue", DISPATCH_QUEUE_SERIAL);
  }
  return self;
}

#pragma mark - React native communicate

RCT_REMAP_METHOD(discoverDevices,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSMutableArray *peripherals = [[NSMutableArray alloc] init];
  if (!_arrayPeripheral || _arrayPeripheral.count == 0) {
    reject(RCTJSONStringify(@[], nil), @"not getting any peripehral", nil);
  }
  
  for (int i = 0; i < _arrayPeripheral.count; i++) {
    HBPeripheral *p = [_arrayPeripheral objectAtIndex:i];
    [peripherals addObject:[p toDictionary]];
  }
    resolve(peripherals);
}

RCT_EXPORT_METHOD(handleSearch){
  RCTLogInfo(@"handleSearch");
  [_myBle scan];
}

RCT_EXPORT_METHOD(handleConnect:(NSString *)address)
{
  RCTLogInfo(@"handleConnect");
  if (_arrayPeripheral.count == 0) {
    [_myBle scan];
    RCTLogInfo(@"handleConnect: no peripheral in list");
    return;
  }
  [_myBle stopScan];
  
  CBPeripheral * peripheral;
  for (HBPeripheral *hbPeripheral in _arrayPeripheral) {
    if ([hbPeripheral.address isEqualToString:address]) {
      peripheral = hbPeripheral.peripherial;
    }
  }
  
  if (!peripheral) {
    [_myBle scan];
    return;
  }
  
  dispatch_async(_myQueue, ^{
    if([_myBle Open:peripheral])
    {
      RCTLogInfo(@"connect and print");
      [_myPos SetIO:_myBle];
      [_myLabel SetIO:_myBle];

    }
    else
    {
      [_myPos POS_Reset];
      #define StringFromBOOL(b) ((b) ? @"YES" : @"NO")
      [_myPos SetIO:_myBle];
      [_myLabel SetIO:_myBle];

      bool isOpen = [_myBle IsOpened];
      RCTLogInfo(@"fail or already connected %@", StringFromBOOL(isOpen));
    }
  });
}

RCT_EXPORT_METHOD(handleDisconnect)
{
  RCTLogInfo(@"handleDisconnect");
  [_myBle Close];
}

RCT_EXPORT_METHOD(checkPrinterStatus:(NSString *) string
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  
#define StringFromBOOL(b) ((b) ? @"YES" : @"NO")
  bool isOpen = [_myBle IsOpened];
  RCTLogInfo(@"check statussssss %@", StringFromBOOL(isOpen));
  
  if (isOpen) {
    resolve(@"YES");
  }
  reject(RCTJSONStringify(@"NO", nil), @"not connected", nil);
  
}

RCT_EXPORT_METHOD(captureRef:(nonnull NSNumber *)target
                  withConnectAddress:(NSString *) address
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  [self.bridge.uiManager addUIBlock:^(__unused RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {
    if (!_arrayPeripheral || _arrayPeripheral.count == 0) {
      NSLog(@"no peripheral hereee");
      [_myPos POS_Reset];
      [_myBle Close];
        [_myBle stopScan];
      [_myBle scan];
      
      reject(RCTErrorUnspecified, @"restart scaning", nil);
      return;
    }
    // Get view
    NSLog(@"%@", viewRegistry);
    UIView *view;
    view = viewRegistry[target];
    if (!view) {
      reject(RCTErrorUnspecified, [NSString stringWithFormat:@"No view found with reactTag: %@", target], nil);
      return;
    }
    
    UIView* rendered;
    
      RCTScrollView* rctScrollView = view;
      UIScrollView* scrollView = rctScrollView.scrollView;
      
      rendered = scrollView;
    
    UIImage* image = nil;
    
     UIGraphicsBeginImageContextWithOptions(scrollView.contentSize, NO, 1);
    {
      CGPoint savedContentOffset = scrollView.contentOffset;
      CGRect savedFrame = scrollView.frame;
      
      scrollView.contentOffset = CGPointZero;
      scrollView.frame = CGRectMake(0, 0, scrollView.contentSize.width, scrollView.contentSize.height);
      
      [scrollView.layer renderInContext: UIGraphicsGetCurrentContext()];
      image = UIGraphicsGetImageFromCurrentImageContext();
      
      scrollView.contentOffset = savedContentOffset;
      scrollView.frame = savedFrame;
    }
    UIGraphicsEndImageContext();
    
    if (!image) {
      reject(RCTErrorUnspecified, @"Failed to capture view snapshot. UIGraphicsGetImageFromCurrentImageContext() returned nil!", nil);
      return;
    }
    
    UIImage *logoImage = [UIImage imageNamed:@"logoh"];
    CBPeripheral * peripheral;
    for (HBPeripheral *hbPeripheral in _arrayPeripheral) {
      if ([hbPeripheral.address isEqualToString:address]) {
        peripheral = hbPeripheral.peripherial;
      }
    }
    
    if (!peripheral) {
      [_myPos POS_Reset];
      [_myBle Close];
      [_myBle scan];
      reject(RCTErrorUnspecified, @"fail to search the address", nil);
    }
    
    if([_myBle Open:peripheral])
    {
      RCTLogInfo(@"connect and print");
      [_myPos SetIO:_myBle];
      [_myLabel SetIO:_myBle];
      [_myPos POS_PrintPicture:logoImage x:-2 nWidth:200 nHeight:45 nBinaryAlgorithm:1 nCompressMethod:0];
      [_myPos POS_PrintPicture:image x:-2 nWidth:375 nHeight:scrollView.contentSize.height nBinaryAlgorithm:1 nCompressMethod:1];
      [_myBle stopScan];
      resolve(@"finished printing");
    }
    else
    {
      [_myPos SetIO:_myBle];
      [_myLabel SetIO:_myBle];
      [_myPos POS_PrintPicture:logoImage x:-2 nWidth:200 nHeight:45 nBinaryAlgorithm:1 nCompressMethod:0];
      [_myPos POS_PrintPicture:image x:-2 nWidth:375 nHeight:scrollView.contentSize.height nBinaryAlgorithm:1 nCompressMethod:1];
      [_myBle Close];
      [_myBle scan];
      RCTLogInfo(@"fail or already connected");
      
      reject(RCTErrorUnspecified, @"restart scaning", nil);
    }
  }];
}

#pragma mark - broadcast device found

+ (NSString *) getBroacastKey {
  return @"foundDevices";
}

- (void) brocastPeripheralArray:(NSArray *) devicesList {
  [[NSNotificationCenter defaultCenter]
   postNotificationName:[HBPrinter getBroacastKey]
   object:self
   userInfo:@{ @"devices": _arrayPeripheral}];
}


#pragma mark - bluetooth library delegate

- (void)didDiscoverBLE:(CBPeripheral *)peripheral address:(NSString *)address rssi:(int)rssi
{
  RCTLogInfo(@"didDiscoverBLE");
  [self brocastPeripheralArray:_arrayPeripheral];
  // Handle Discovery
  for (HBPeripheral *periInArray in _arrayPeripheral) {
    if ([periInArray.address isEqualToString:address]) {
      return;
    }
  }
  
  HBPeripheral *hbPeripheral = [[HBPeripheral alloc] initWithPeripherial:peripheral address:address];
  [self.arrayPeripheral addObject:hbPeripheral];
  [self brocastPeripheralArray:_arrayPeripheral];
   NSString * title = [NSString stringWithFormat:@"%@ %@ (RSSI:%d)", peripheral.name, address, rssi];
  RCTLogInfo(@"discover peripheral %@ at %@, %@", title, peripheral, address);
  
}

- (void) didBleOpen:(CBPeripheral *) peripheral {
  RCTLogInfo(@"didBleOpen %@", peripheral);
}

- (void) didBleReceive:(unsigned char * ) buffer length:(unsigned long) length {
  RCTLogInfo(@"didBleReceive, %s", buffer);
}

- (void) didBleDisconnect {
  RCTLogInfo(@"didbleDisconnect");
}


@end
