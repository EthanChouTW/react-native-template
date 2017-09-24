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

NSString * SERIAL_SERVICE = @"6E400001-B5A3-F393-E0A9-E50E24DCCA9E";
NSString *TX_SERVICE = @"6E400002-B5A3-F393-E0A9-E50E24DCCA9E";
NSString *RX_SERVICE = @"6E400003-B5A3-F393-E0A9-E50E24DCCA9E";

@interface HBPrinter()<CBCentralManagerDelegate, CBPeripheralDelegate>
@property (weak, nonatomic) IBOutlet UILabel *lbl_uuid;
@property (weak, nonatomic) IBOutlet UIButton *btn_get_sleep;
@property (weak, nonatomic) IBOutlet UIButton *btn_get_hr;
@property (weak, nonatomic) IBOutlet UIButton *btn_get_step;
@property (weak, nonatomic) IBOutlet UIButton *btn_link;

@property (weak, nonatomic) IBOutlet UIButton *btn_set_time;
@property (weak, nonatomic) IBOutlet UILabel *lbl_status;
@property (weak, nonatomic) IBOutlet UILabel *lbl_data;
- (IBAction)btn_get_step_click:(id)sender;
- (IBAction)btn_get_hr_click:(id)sender;
- (IBAction)btn_get_sleep_click:(id)sender;
- (IBAction)btn_set_time_click:(id)sender;
- (IBAction)btn_link_click:(id)sender;

@property (strong, nonatomic) NSDictionary *stepDict;
@property (strong, nonatomic) NSDictionary *hrDict;
@property (strong, nonatomic) NSDictionary *sleepDict;

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
    status = 0;
    hr_or_step = 0;
    BFS = [blelib alloc];
    is_found_TX_characteristic = NO;
    is_found_RX_characteristic = NO;
    selectedCentralManager = nil;
    _stepDict = [NSDictionary new];
    _sleepDict = [NSDictionary new];
    _hrDict = [NSDictionary new];
  }
  return self;
}

#pragma mark - React native communicate

RCT_EXPORT_METHOD(handleSearch){
  RCTLogInfo(@"handleSearch");

}

RCT_EXPORT_METHOD(test){
  RCTLogInfo(@"test");
  [self handleStep];
}

RCT_EXPORT_METHOD(handleConnect:(NSString *)string
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  RCTLogInfo(@"handleConnect");

  if (!selectedCentralManager) {
    selectedCentralManager = [[CBCentralManager alloc] initWithDelegate:self queue:nil];
    RCTLogInfo(@"init manager");
    resolve(@"init manager");
    return;
  }
  if(selectedPeripheral.state == CBPeripheralStateConnected) {
    status = 1;
    RCTLogInfo(@"connected");
    resolve(@"connected");
  } else {
    RCTLogInfo(@"try again");
    resolve(@"try again");
  }
}

RCT_EXPORT_METHOD(handleStep)
{
 RCTLogInfo(@"try");
  hr_or_step = 1;
  [selectedPeripheral writeValue:[BFS getSimpleQueryPacket] forCharacteristic:txCharacteristic type:CBCharacteristicWriteWithResponse];
}

RCT_EXPORT_METHOD(handleSleep)
{
   [selectedPeripheral writeValue:[BFS getSleepQueryPacket] forCharacteristic:txCharacteristic type:CBCharacteristicWriteWithResponse];
}

RCT_EXPORT_METHOD(handleHr)
{
  hr_or_step = 0;
 [selectedPeripheral writeValue:[BFS getSimpleQueryPacket] forCharacteristic:txCharacteristic type:CBCharacteristicWriteWithResponse];
}

RCT_EXPORT_METHOD(getStepData:(NSString *)string
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  RCTLogInfo(@"get step %@", _stepDict);
  [self handleStep];
  resolve(_stepDict);
}

RCT_EXPORT_METHOD(getHrData:(NSString *)string
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  RCTLogInfo(@"get step %@", _stepDict);
  [self handleHr];
  resolve(_stepDict);
}

RCT_EXPORT_METHOD(getSleepData:(NSString *)string
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
  RCTLogInfo(@"get step %@", _stepDict);
  [self handleSleep];
  resolve(_stepDict);
}


RCT_EXPORT_METHOD(handleDisconnect)
{
  RCTLogInfo(@"handleDisconnect");
  [selectedCentralManager cancelPeripheralConnection:selectedPeripheral];
}

#pragma mark - broadcast device found

+ (NSString *) getBroacastKey {
  return @"foundDevices";
}

- (void) brocastPeripheralArray:(NSArray *) devicesList {
//  [[NSNotificationCenter defaultCenter]
//   postNotificationName:[HBPrinter getBroacastKey]
//   object:self
//   userInfo:@{ @"devices": _arrayPeripheral}];
}


#pragma mark - bluetooth library delegate

- (void)centralManagerDidUpdateState:(CBCentralManager *)central {
  if ([central state] == CBCentralManagerStatePoweredOn) {
    [selectedCentralManager scanForPeripheralsWithServices:nil options:nil];
    timer = [NSTimer scheduledTimerWithTimeInterval:10.0f target:self selector:@selector(scanTimeout:) userInfo:nil repeats:NO];
  } else {
    _lbl_status.text = @"請確認藍芽裝置已正確開啟";
  }
}

-(void)dealloc {
  [selectedCentralManager cancelPeripheralConnection:selectedPeripheral];
}

- (void) scanTimeout:(NSTimer*)timer {
  if (selectedCentralManager != NULL){
    [selectedCentralManager stopScan];
  }
  _lbl_status.text = @"搜尋逾時，找不到裝置!";
  _btn_link.enabled = YES;
}

-(void)centralManager:(CBCentralManager *)central didDiscoverPeripheral:(CBPeripheral *)peripheral advertisementData:(NSDictionary *)advertisementData RSSI:(NSNumber *)RSSI {

  if ([peripheral.name containsString:@"Impulse"]) {
    NSLog(@"didDiscoverPeripheral Impulse");
    NSLog(@"adverisement: %@",advertisementData);
    if (selectedCentralManager != NULL){
      [selectedCentralManager stopScan];
      if(timer) {
        [timer invalidate];
        timer = nil;
      }
    }
    selectedPeripheralUUID = peripheral.identifier.UUIDString;
    selectedPeripheral = peripheral;
    _btn_link.enabled = YES;
    _lbl_uuid.text = selectedPeripheralUUID;

    [selectedCentralManager connectPeripheral: selectedPeripheral options:nil];
  }
}

- (void)centralManager:(CBCentralManager *)central didConnectPeripheral:(CBPeripheral *)peripheral {
  NSLog(@"connected %@", selectedPeripheral.identifier.UUIDString);
  //    selectedPeripheral = [peripheral copy];
  [selectedPeripheral setDelegate:self];
  [selectedPeripheral discoverServices:nil];
}

-(void)centralManager:(CBCentralManager *)central didDisconnectPeripheral:(CBPeripheral *)peripheral error:(NSError *)error {
  NSLog(@"disconnect");
  RCTLogInfo(@"disconnect");
  if(status == 1) {
    status = 0;
    selectedCentralManager = nil;
  }
}

- (void)peripheral:(CBPeripheral *)aPeripheral didDiscoverServices:(NSError *)error {
  NSLog(@"didDiscoverServices");
  for ( CBService *aService in aPeripheral.services ) {
    if ([aService.UUID isEqual:[CBUUID UUIDWithString: SERIAL_SERVICE]]) {
      [aPeripheral discoverCharacteristics:nil forService:aService];
    }
  }
}

- (void) peripheral:(CBPeripheral *)aPeripheral didDiscoverCharacteristicsForService:(CBService *)service error:(NSError *)error {
  NSLog(@"didDiscoverCharacteristicsForService");
  if([service.UUID isEqual:[CBUUID UUIDWithString: SERIAL_SERVICE]]) {
    for ( CBCharacteristic *aChar in service.characteristics ) {
      if([aChar.UUID isEqual:[CBUUID UUIDWithString:TX_SERVICE]]) {
        txCharacteristic = aChar;
        is_found_TX_characteristic = YES;
      }

      if([aChar.UUID isEqual:[CBUUID UUIDWithString:RX_SERVICE]]) {
        rxCharacteristic = aChar;
        [selectedPeripheral setNotifyValue:YES forCharacteristic:rxCharacteristic];
        is_found_RX_characteristic = YES;
      }

      if(is_found_RX_characteristic == YES && is_found_TX_characteristic == YES) {

      }
    }
  }
}

- (void)peripheral:(CBPeripheral *)peripheral didUpdateValueForCharacteristic:(CBCharacteristic *)characteristic error:(NSError *)error {
  NSLog(@"didUpdateValueForCharacteristic!");
  [self handleReceivedPacket: characteristic.value];
}

-(void) handleReceivedPacket:(NSData *) data {
  if([BFS checkPacketChecksum: data] == YES) {
    switch ([BFS getPacketHandle:data]) {
      case 226: // E2, 步數和心率
        [self handleType2:data];
        break;
      case 233: // E9, 睡眠
        [self handleType9:data];
        break;
      case 238: // EE, 校正時間
        [self handleTypeE:data];
        break;
      default:
        _lbl_status.text = @"封包錯誤";
        break;
    }
  } else {
    _lbl_status.text = @"封包錯誤";

  }
}


-(void) handleTypeE:(NSData *) data {
  _lbl_status.text = @"時間同步成功";

}

-(void) handleType2:(NSData *) data{
  if(hr_or_step == 0) {
    NSDictionary * dict = [BFS handlePacketHR:data];
    if([[dict objectForKey:@"status"] isEqualToString:@"success"]) {
      _hrDict = dict;
      NSLog(@"%@", dict);
      RCTLogInfo(@"%@", dict);
      _lbl_data.text = [NSString stringWithFormat:@"最小: %@bpm, 最大: %@bpm, 平均: %@bpm", [[dict objectForKey:@"data"] objectForKey:@"HR_min"]
                        , [[dict objectForKey:@"data"] objectForKey:@"HR_max"]
                        , [[dict objectForKey:@"data"] objectForKey:@"HR_avg"]];
    } else if([[dict objectForKey:@"status"] isEqualToString:@"nodata"]) {
      _lbl_status.text = @"沒有資料";
    } else {
      _lbl_status.text = @"錯誤";
    }
  } else if( hr_or_step == 1) {
    NSDictionary * dict = [BFS handlePacketStep:data];
    _stepDict = dict;
    NSLog(@"%@", dict);
    RCTLogInfo(@"%@", dict);
    if([[dict objectForKey:@"status"] isEqualToString:@"success"]) {

      _lbl_data.text = [NSString stringWithFormat:@"步數: %@步", [[dict objectForKey:@"data"] objectForKey:@"step"]];
    } else if([[dict objectForKey:@"status"] isEqualToString:@"nodata"]) {
      _lbl_status.text = @"沒有資料";
    } else {
      _lbl_status.text = @"錯誤";
    }
  }

}

-(void) handleType9:(NSData *) data {
  NSDictionary * dict = [BFS handlePacketSleep:data];
  if([[dict objectForKey:@"status"] isEqualToString:@"success"]) {
    _sleepDict = dict;
    NSLog(@"%@", dict);
    RCTLogInfo(@"%@", dict);
    _lbl_data.text = [NSString stringWithFormat:@"睡覺總時間: %@, 睡眠效率: %@, 上床時間: %@, 起床時間: %@", [[dict objectForKey:@"data"] objectForKey:@"inBedTime"]
                      , [[dict objectForKey:@"data"] objectForKey:@"efficiency"]
                      , [[dict objectForKey:@"data"] objectForKey:@"timeGoToBed"]
                      , [[dict objectForKey:@"data"] objectForKey:@"timeWakeUp"]];
  } else if([[dict objectForKey:@"status"] isEqualToString:@"nodata"]) {
    _lbl_status.text = @"沒有睡眠資料";
  } else {
    _lbl_status.text = @"錯誤";
  }
}



@end
