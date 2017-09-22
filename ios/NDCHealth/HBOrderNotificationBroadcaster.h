//
//  HBOrderNotificationBroadcaster.h
//  NDCHealth
//
//  Created by EthanChou on 2017/9/14.
//  Copyright © 2017年 Honestbee. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTLog.h>

static NSString *EVENT_LISTENER = @"orderListener";

@interface HBOrderNotificationBroadcaster : RCTEventEmitter<RCTBridgeModule>

@end
