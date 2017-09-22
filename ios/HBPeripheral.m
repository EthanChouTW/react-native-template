//
//  HBPeripheral.m
//  NDCHealth
//
//  Created by EthanChou on 2017/9/4.
//  Copyright © 2017年 Honestbee. All rights reserved.
//

#import "HBPeripheral.h"
#import <Foundation/Foundation.h>

@implementation HBPeripheral

static NSString *ADDRESS = @"address";
static NSString *NAME = @"name";

+ (NSArray *) devicesListToDictionary:(NSArray *)devicesList {
  NSMutableArray *devicesListArray = [NSMutableArray new];
  for (HBPeripheral *peripheral in devicesList) {
    [devicesListArray addObject:[peripheral toDictionary]];
  }
  return [NSArray arrayWithArray:devicesListArray];
}

- (id)initWithPeripherial:(CBPeripheral *)peripherial address:(NSString *)address {
  self = [self init];
  if (self) {
    _address = address;
    _peripherial = peripherial;
  }
  return self;
}

-(NSDictionary *)toDictionary {
  NSMutableDictionary *peripheralDictionary = [NSMutableDictionary dictionary];
  [peripheralDictionary setObject: _address forKey: ADDRESS];
  [peripheralDictionary setObject:_peripherial.name forKey: NAME];
  return peripheralDictionary;
}

@end
