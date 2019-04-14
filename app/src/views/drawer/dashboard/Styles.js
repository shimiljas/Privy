import RF from "react-native-responsive-fontsize";
import theme from "../../../common/Color";
import Util from "../../../common/Util";

export default {
  container: {
    flex: 1
  },
  btnText: {
    fontSize: RF(3),
    color: "white",
    fontFamily: "Poppins-Medium"
  },
  buttonArea: {
    height: "15%",
    width: "100%"
  },
  btn: {
    backgroundColor: theme.appDefultColor,
    width: Util.getWidth(75),
    height: Util.getHeight(7)
  },
  flatlist: {
    //height:'80%',
  },
  btnView: {
    height: "10%",
    width: "100%"
  }
};
