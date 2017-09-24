//
//  HBPrinter.h
//  NDCHealth
//
//  Created by EthanChou on 2017/6/27.
//  Copyright © 2017年 Honestbee. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import "blelib.h"
#import <CoreBluetooth/CoreBluetooth.h>

@interface HBPrinter : NSObject<RCTBridgeModule>
{
  CBPeripheral * selectedPeripheral;
  CBCentralManager * selectedCentralManager;
  NSString * selectedPeripheralUUID;
  CBCharacteristic *txCharacteristic;
  CBCharacteristic *rxCharacteristic;

  //    BleFormatSample * BFS;
  blelib * BFS;

  int status;
  int hr_or_step;
  NSTimer * timer;

  BOOL is_found_TX_characteristic;
  BOOL is_found_RX_characteristic;
}
+ (NSString *) getBroacastKey;
@end
