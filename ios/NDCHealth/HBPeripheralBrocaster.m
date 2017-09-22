//
//  HBPeripheralBrocaster.m
//  NDCHealth
//
//  Created by EthanChou on 2017/9/7.
//  Copyright © 2017年 Honestbee. All rights reserved.
//

#import "HBPeripheralBrocaster.h"
#import "HBPeripheral.h"
#import "HBPrinter.h"

static NSString *EVENT_LISTENER = @"devicesListener";

@interface HBPeripheralBrocaster() {
  bool hasListeners;
}

@end

@implementation HBPeripheralBrocaster

RCT_EXPORT_MODULE();

#pragma mark - devices listener

- (NSArray<NSString *> *)supportedEvents
{
  return @[EVENT_LISTENER];
}

/*
 * invoked by React when addListener
 */
-(void)startObserving
{
  hasListeners = YES;
  [[NSNotificationCenter defaultCenter]
   addObserver:self
   selector:@selector(devicesFound:)
   name:[HBPrinter getBroacastKey]
   object:nil];
}

/*
 * invoked by React when remove subscription
 */
-(void)stopObserving
{
  hasListeners = NO;
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

/*
 * send devices list to React
 */
- (void)devicesFound:(NSNotification *) notification
{
  NSDictionary *userInfo = [notification userInfo];
  NSArray *devicesList = userInfo[@"devices"];
  NSArray *devicesListArray = [HBPeripheral devicesListToDictionary:devicesList];
  if (hasListeners) {
    [self sendEventWithName:EVENT_LISTENER body:devicesListArray];
  }
}



@end
