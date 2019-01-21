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
#import "RCTBraintree.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure]; //Add This Line
  [
   RNFirebaseNotifications configure];  //Add This Line
  NSURL *jsCodeLocation;

//    [FIRApp configure];
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


- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
         annotation:(id)annotation
  sourceApplication:(NSString *)sourceApplication
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  
  // Add any custom logic here.
  [BTAppSwitch setReturnURLScheme:@"org.reactjs.native.example.PrivyApp.payments"];
  return [[RCTBraintree sharedInstance] application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}





- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  return [[RCTBraintree sharedInstance] application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
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
