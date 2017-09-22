//
//  ParseModule.m
//  NDCHealth
//
//  Created by EthanChou on 2017/8/17.
//  Copyright © 2017年 Honestbee. All rights reserved.
//

#import "ParseModule.h"
#import <React/RCTLog.h>
#import <Parse/Parse.h>

@implementation ParseModule

static NSString* channelPrefix = @"s3cr3t-users-";
static NSString* CHANNELS = @"channels";

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(updateParseInstallation:(NSString *)userId)
{
  PFInstallation *currentInstallation = [PFInstallation currentInstallation];
  [currentInstallation addObject:[NSString stringWithFormat:@"%@%@", channelPrefix, userId] forKey:CHANNELS];
  [currentInstallation saveInBackground];
}

RCT_EXPORT_METHOD(unSubscribeAllParseChannels)
{
    PFInstallation *currentInstallation = [PFInstallation currentInstallation];
    NSArray *subscribedChannels = currentInstallation.channels;
    for (NSString *channel in subscribedChannels) {
      [currentInstallation removeObject:channel forKey:CHANNELS];
    }
  [currentInstallation saveInBackground];
}

@end
