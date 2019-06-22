/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import <Firebase.h> //Add This Line
//#import "RNFirebaseMessaging.h"
#import "RNFirebaseNotifications.h" //Add This Line

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RCTLinkingManager.h"


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure]; //Add This Line
  [RNFirebaseNotifications configure];
     //Add This Line
  NSURL *jsCodeLocation;

   // [FIRApp configure];
//    [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];


  
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"PrivyApp"
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







- (NSString *)paymentsURLScheme {
  NSString *bundleIdentifier = [[NSBundle mainBundle] bundleIdentifier];
  return [NSString stringWithFormat:@"%@.%@", bundleIdentifier, @"payments"];
}




//
//- (void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler
//{
//  [RNFIRMessaging willPresentNotification:notification withCompletionHandler:completionHandler];
//}
//
//- (void)userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler
//{
//  [RNFIRMessaging didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
//}
//
//- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
//  [RNFIRMessaging didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
//}

@end
