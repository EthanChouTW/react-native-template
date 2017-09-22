//
//  HBOrderNotificationBroadcaster.m
//  NDCHealth
//
//  Created by EthanChou on 2017/9/14.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "HBOrderNotificationBroadcaster.h"

static NSString *USER_ID = @"USER_ID";
static NSString *ORDER_NUMBER = @"ORDER_NUMBER";
static NSString *ALARM_PARAMS = @"ALARM_PARAMS";

@interface HBOrderNotificationBroadcaster(){
  bool hasListeners;
}

@end

@implementation HBOrderNotificationBroadcaster

RCT_EXPORT_MODULE();

#pragma mark - order listener

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
   selector:@selector(orderNotificationReceived:)
   name:EVENT_LISTENER
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
 * receive notification from remote and then send order notification to React
 */
- (void)orderNotificationReceived:(NSNotification *) notification
{
  NSDictionary *orderNotification = [notification userInfo];
  NSMutableDictionary *mutableOrderInfo = [NSMutableDictionary new];
  
  if ([orderNotification objectForKey:USER_ID]) {
    [mutableOrderInfo setObject:orderNotification[@"user_id"] forKey:@"user_id"];
  }
  
  if ([orderNotification objectForKey:ALARM_PARAMS] && [[orderNotification objectForKey:ALARM_PARAMS] objectForKey:ORDER_NUMBER]) {
    [mutableOrderInfo setObject:orderNotification[ALARM_PARAMS][ORDER_NUMBER] forKey:ORDER_NUMBER];
  }

  if (hasListeners) {
    [self sendEventWithName:EVENT_LISTENER body:[NSDictionary dictionaryWithDictionary:mutableOrderInfo]];
  }
}

@end
