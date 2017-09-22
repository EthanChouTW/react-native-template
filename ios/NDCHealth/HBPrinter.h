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

@interface HBPrinter : NSObject<RCTBridgeModule>
+ (NSString *) getBroacastKey;
@end
