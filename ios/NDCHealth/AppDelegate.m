/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import <Parse/Parse.h>
#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "HBOrderNotificationBroadcaster.h"
#import <BugsnagReactNative/BugsnagReactNative.h>
#import <AudioToolbox/AudioToolbox.h>

@interface AppDelegate() <UIAlertViewDelegate> {
  SystemSoundID soundId;
}
@end

@implementation AppDelegate

static NSString *APPLICATION_ID = @"";
static NSString *CLIENT_KEY = @"";
static NSString *SERVER_URL = @"";

static NSString *APP_TYPE_KEY = @"";
static NSString *RECEIVEING_KEY = @"";

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
//  [BugsnagReactNative start];
//  [Fabric with:@[[Crashlytics class]]];
//
//  [Parse initializeWithConfiguration:[ParseClientConfiguration configurationWithBlock:^(id<ParseMutableClientConfiguration> configuration) {
//    configuration.applicationId = APPLICATION_ID;
//    configuration.clientKey = CLIENT_KEY;
//    configuration.server = SERVER_URL;
//  }]];

  UIUserNotificationType userNotificationTypes = (UIUserNotificationTypeAlert |
                                                  UIUserNotificationTypeBadge |
                                                  UIUserNotificationTypeSound);
  UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:userNotificationTypes
                                                                           categories:nil];
  [application registerUserNotificationSettings:settings];
  [application registerForRemoteNotifications];
  
  NSURL *jsCodeLocation;

  #ifdef DEBUG
     jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  #else
        jsCodeLocation = [CodePush bundleURL];
  #endif
  

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"NDCHealth"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  // Store the deviceToken in the current installation and save it to Parse.
//  PFInstallation *currentInstallation = [PFInstallation currentInstallation];
//  [currentInstallation setDeviceTokenFromData:deviceToken];
//  [currentInstallation addUniqueObject:@"bee" forKey:APP_TYPE_KEY];
//  [currentInstallation addUniqueObject:@YES forKey:RECEIVEING_KEY];
//  [currentInstallation saveInBackground];;
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
//  [self handlePushWithApplication:application andUserInfo:userInfo];
//  [self broadcastNotification:userInfo];
}

- (void)handlePushWithApplication:(UIApplication *)application andUserInfo:(NSDictionary *)userInfo {
  UIApplicationState state = [application applicationState];
  if (state == UIApplicationStateActive) {
    NSString *cancelTitle = @"OK";
    NSString *message = [[userInfo valueForKey:@"aps"] valueForKey:@"alert"];
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"NDCHealth"
                                                        message:message
                                                       delegate:self
                                              cancelButtonTitle:cancelTitle
                                              otherButtonTitles:nil];
    
    NSString *soundName = [[userInfo valueForKey:@"aps"] valueForKey:@"sound"];
    if (soundName) {
      NSURL *bundlePath = [[NSBundle mainBundle] URLForResource:soundName.stringByDeletingPathExtension
                                                  withExtension:soundName.pathExtension];
      
      AudioServicesCreateSystemSoundID((__bridge CFURLRef)bundlePath, &soundId);
    }
    
    if (soundId != -1) {
      AudioServicesPlaySystemSound(soundId);
    }
    [alertView show];
  }

}

- (void)alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex {
  AudioServicesDisposeSystemSoundID(soundId);
}


- (void) broadcastNotification:(NSDictionary *)userInfo {
  [[NSNotificationCenter defaultCenter]
   postNotificationName:EVENT_LISTENER
   object:self
   userInfo:userInfo];
}

@end
