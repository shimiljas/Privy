/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import { YellowBox, SafeAreaView, AsyncStorage } from "react-native";
import { Root } from "native-base";
// provider import for  wrapping the main component
import { Provider } from "react-redux";
//middleware
import Reduxthunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import firebase from "react-native-firebase";
import NotificationPopup from "react-native-push-notification-popup";

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
    this.checkPermission();
    this.createNotificationListeners();
  }

  getToken = async () => {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log("fcmToken:", fcmToken);
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
    console.log("fcmToken:", fcmToken);
  };

  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };

  showAlert = (title, body, data) => {
    console.log(title, body, data, "title, body, data");
    if (title && body) {
      this.popup.show({
        onPress: function() {
          console.log("Pressed");
        },
        appIconSource: require("./assets/images/Icon.png"),
        appTitle: "Privy",
        timeText: "Now",
        title: title,
        body: body
      });
    }
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log("permission rejected");
    }
  };

  createNotificationListeners = async () => {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body, data } = notification;
        this.showAlert(title, body, data, notification);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { data } = notificationOpen.notification;
        store.store.dispatch({
          type: "NOTIFICATION",
          payload: data
        });
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body, data } = notificationOpen.notification;
      this.showAlert(title, body, data);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      console.log(JSON.stringify(message));
    });
  };

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
    this.unsubscribeFromNotificationListener();
  }

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
            <NotificationPopup ref={ref => (this.popup = ref)} />
            <PrivyApp />
          </SafeAreaView>
        </Root>
      </Provider>
    );
  }
}
