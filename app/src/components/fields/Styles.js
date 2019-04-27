import RF from "react-native-responsive-fontsize";
import Util from "../../common/Util";
import Color from "../../common/Color";

export default {
  inputText: {
    fontSize: RF(2.5),
    color: Color.grayClg,
    marginTop: "2%"
    //marginLeft: "15%"
  },
  centerH: {
    justifyContent: "center"
  },
  disableDate: {
    marginLeft: "1%",
    fontSize: RF(2)
  },
  icon: { color: Color.grayClg, marginTop: "2%" },
  pickerIcon: { color: Color.grayClg, marginTop: "6%" },

  inputView: { width: "90%" },
  checkBox: { borderRadius: Util.getWidth(3), justifyContent: "center" },
  radioBtn: { borderRadius: Util.getWidth(3), justifyContent: "center", 
  activeColor : Color.appDefultColor },
  textTitle: { marginLeft: 20, fontSize: RF(2) },
  radioBtnTitle: { marginLeft: 10, fontSize: RF(2) },
  pickerItem: {
    fontSize: RF(3),
    fontWeight: "bold",
    color: Color.grayClg
  },
  lableText: { marginLeft: 15, marginTop: 5, fontSize: RF(1.8) }
};
