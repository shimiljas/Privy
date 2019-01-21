import RF from "react-native-responsive-fontsize";
import Util from "../../common/Util";
import Color from "../../common/Color";

export default {
  closeBtn: {
    width: Util.getWidth(12),
    height: Util.getWidth(12)
  },
  textStyles: {
    fontSize: RF(3.2),
    color: Color.grayClg,
    fontWeight: "900"
  },
  btn: {
    padding: 15,
    backgroundColor: Color.appDefultColor,
    borderRadius: 50,
    width: "80%"
  },
  btnView: { height: "12%", justifyContent: "center", alignItems: "center" },
  textView: { height: "77%", marginHorizontal: "7%" },
  titleView: { height: "8%", justifyContent: "center", marginLeft: "5%" }
};
