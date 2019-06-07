/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import { YellowBox, SafeAreaView,AsyncStorage } from "react-native";
import { Root } from "native-base";
// provider import for  wrapping the main component
import { Provider } from "react-redux";
//middleware
import Reduxthunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
// import firebase, { Notification } from "react-native-firebase";
// import { Notification } from 'react-native-firebase';
// import firebase ,{ Notification, NotificationOpen } from 'react-native-firebase';
import reducer from "./app/src/reducers";
// main app root
import PrivyApp from "./app/src/index";

//common files
import Colors from "./app/src/common/Color";

export default class App extends Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated"]);
  }

  // async componentDidMount() {
  //   firebase
  //     .messaging()
  //     .hasPermission()
  //     .then(enabled => {
  //       if (enabled) {
  //         firebase
  //           .messaging()
  //           .getToken()
  //           .then(token => {
  //             console.log("LOG token: ", token);

  //             //   util.setStore('DeviceToken', token)
  //             //     .then(res => {

  //             //     })
  //             //     .catch((error) => {
  //             //       console.log('Token Error ', error)
  //             //     });
  //           });
  //         // user has permissions
  //       } else {
  //         firebase
  //           .messaging()
  //           .requestPermission()
  //           .then(() => {
  //             alert("User Now Has Permission");
  //           })
  //           .catch(error => {
  //             alert("Error", error);
  //             // User has rejected permissions
  //           });
  //       }
  //     });

  //   this.notificationListener = firebase
  //     .notifications()
  //     .onNotification(notification => {
  //       // Process your notification as required
  //       const {
  //         body,
  //         data,
  //         notificationId,
  //         sound,
  //         subtitle,
  //         title
  //       } = notification;
  //       console.log("LOG Check: ", title, body, JSON.stringify(data));
  //     });
  // }
  // componentWillUnmount() {
  //   this.notificationListener();
  // }
  //     const notificationOpen: NotificationOpen = await firebase.notifications().getInitialNotification();
  //     if (notificationOpen) {
  //         const action = notificationOpen.action;
  //         const notification: Notification = notificationOpen.notification;
  //         var seen = [];
  //         alert(JSON.stringify(notification.data, function(key, val) {
  //             if (val != null && typeof val == "object") {
  //                 if (seen.indexOf(val) >= 0) {
  //                     return;
  //                 }
  //                 seen.push(val);
  //             }
  //             return val;
  //         }));
  //     }
  //     const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
  //             .setDescription('My apps test channel');
  // // Create the channel
  //     firebase.notifications().android.createChannel(channel);
  //     this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
  //         // Process your notification as required
  //         // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
  //     });
  //     this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
  //         // Process your notification as required
  //         notification
  //             .android.setChannelId('test-channel')
  //             .android.setSmallIcon('ic_launcher');
  //         firebase.notifications()
  //             .displayNotification(notification);

  //     });
  //     this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
  //         // Get the action triggered by the notification being opened
  //         const action = notificationOpen.action;
  //         // Get information about the notification that was opened
  //         const notification: Notification = notificationOpen.notification;
  //         var seen = [];
  //         alert(JSON.stringify(notification.data, function(key, val) {
  //             if (val != null && typeof val == "object") {
  //                 if (seen.indexOf(val) >= 0) {
  //                     return;
  //                 }
  //                 seen.push(val);
  //             }
  //             return val;
  //         }));
  //         firebase.notifications().removeDeliveredNotification(notification.notificationId);

  //     });
  // }
  // componentWillUnmount() {
  //     this.notificationDisplayedListener();
  //     this.notificationListener();
  //     this.notificationOpenedListener();
  // }
  render() {
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    const middleware = [];
    middleware.push(Reduxthunk);
    middleware.push(logger);

    const store = createStore(reducer, {}, applyMiddleware(...middleware));
    return (
      <Provider store={store}>
        <Root>
          <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteClr }}>
            <PrivyApp />
          </SafeAreaView>
        </Root>
      </Provider>
    );
  }
}
