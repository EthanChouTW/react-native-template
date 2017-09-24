//
//  blelib.h
//  blelib
//
//  Created by apple on 2017/9/12.
//  Copyright © 2017年 com. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface blelib : NSObject



- (NSMutableData *)getSleepQueryPacket;
- (NSMutableData *)getSimpleQueryPacket;
- (NSMutableData *)getSyncDeviceTimePacket;

- (Boolean) checkPacketChecksum:(NSData *) data;
- (NSInteger) getPacketHandle:(NSData *) data;

- (NSDictionary *) handlePacketSleep:(NSData *) data;
- (NSDictionary *) handlePacketStep:(NSData *) data;
- (NSDictionary *) handlePacketHR:(NSData *) data;
@end
