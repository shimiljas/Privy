/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {YellowBox, SafeAreaView} from 'react-native';
import {Root, View} from 'native-base';
// provider import for  wrapping the main component
import {Provider} from 'react-redux';
//middleware
import Reduxthunk from 'redux-thunk';
import logger from 'redux-logger';
import {createStore, applyMiddleware} from 'redux';
// import firebase, { Notification } from "react-native-firebase";
// import { Notification } from 'react-native-firebase';
// import firebase ,{ Notification, NotificationOpen } from 'react-native-firebase';
import reducer from './app/src/reducers';
// main app root
import PrivyApp from './app/src/index';

//common files
import Colors from './app/src/common/Color';

export default class App extends Component {
  constructor (props) {
    super (props);
    YellowBox.ignoreWarnings (['Warning: isMounted(...) is deprecated']);
  }

  render () {
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;
    const middleware = [];
    middleware.push (Reduxthunk);
    middleware.push (logger);

    const store = createStore (reducer, {}, applyMiddleware (...middleware));
    return (
      <Provider store={store}>
        <Root>
          <SafeAreaView style={{flex: 1, backgroundColor: Colors.whiteClr}}>
            <PrivyApp />
          </SafeAreaView>
        </Root>
      </Provider>
    );
  }
}
