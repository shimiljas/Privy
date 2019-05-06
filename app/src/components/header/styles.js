import RF from "react-native-responsive-fontsize";
import Color from "../../common/Color";
import globalStyle from "../../common/GlobalStyle";
import Util from "../../common/Util";

export default {
  container: {
    flexDirection: "row",
    backgroundColor: Color.inputBg
    // borderBottomWidth: 1,
    // borderBottomColor: Color.grayClg
  },
  backBg: [
    globalStyle.viewCenter,
    {
      color: Color.appDefaultColor,
      paddingHorizontal: 10
    }
  ],
  imageSize: {
    height: Util.getHeight(2.0),
    width: Util.getHeight(2.5)
  },
  imageSize2: {
    height: Util.getHeight(2.5),
    width: Util.getHeight(2.5)
  },
  backBtn: {
    marginHorizontal: 3
  },
  titleBg: {
    flex: 1,
    paddingTop: 3,
    justifyContent: "center"
  },
  titleText: {
    color: Color.darkGray,
    fontFamily: "Poppins-Medium",
    fontSize: RF(2.7)
  },
  saveBtn: [
    globalStyle.viewCenter,
    {
      fontSize: 20,
      color: Color.appDefaultColor
    }
  ]
};
