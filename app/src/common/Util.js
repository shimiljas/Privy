"use strict";

import { Dimensions, NetInfo } from "react-native";
import { Toast } from "native-base";
import KeyString from './Localization';

const Util = {
  getHeight: percente => {
    percente = !percente ? 100 : percente;
    return (Util.getWindowSize().height * percente) / 100;
  },
  getWidth: percente => {
    percente = !percente ? 100 : percente;
    return (Util.getWindowSize().width * percente) / 100;
  },
  getWindowSize: () => {
    return Dimensions.get("window");
  },

  checkConnection: () => {
    NetInfo.getConnectionInfo().then((connectionInfo) => {
      console.log('Connection Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
    });
  },
  ShowToast: (message, duration, type,textColor) => {
		return Toast.show({
			text: message,
			textStyle: { textAlign: "center",color:textColor },
			position: "bottom",
      duration: duration,
      style: {
        backgroundColor: type,
       }
		});
	},
}
module.exports = Util;