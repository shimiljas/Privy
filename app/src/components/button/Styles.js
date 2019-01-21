import RF from "react-native-responsive-fontsize";
import Util from "../../common/Util";
//import Color from "../../common/Color";

export default {
  btnText: {
    fontSize: RF(2.4),
    color: "white"
  },

  btn: {
    marginLeft: Util.getWidth(2),
    //marginRight: Util.getWidth(2),
    marginTop: Util.getWidth(1),
    width: Util.getWidth(38),
    height: Util.getHeight(7),
    marginBottom: Util.getHeight(10)
  }
};
