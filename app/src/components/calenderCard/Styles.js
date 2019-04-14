import RF from "react-native-responsive-fontsize";
import Util from "../../common/Util";
import Color from "../../common/Color";
import GlobalStyle from "../../common/GlobalStyle";

export default {
  cardArea: {
    marginVertical: Util.getHeight(3),
    height: Util.getHeight(17),
    width: Util.getWidth(90),
    backgroundColor: Color.whiteClr,

    borderColor: Color.calenderColor,
    borderWidth: 1,
    borderRadius: Util.getWidth(2),
    borderLeftWidth: 3
  },
  container: [GlobalStyle.viewFull,{
    flexDirection: "row"
  }],
  dataView: {
    height: "100%",
    width: "12%"
  },
  dataImage: {
    height: "100%",
    width: "80%"
  },
  dataText: [GlobalStyle.viewCenter,{
    height: "100%",
    width: "80%",
    position: "absolute",
  }],

  LeftArea: {
    height: "100%",
    width: "20%",
    paddingLeft: "2%",
    justifyContent: "center"
  },
  imagestyle: {
    height: Util.getHeight(10),
    width: Util.getHeight(10)
  },
  middleView: [GlobalStyle.viewCenter,{
    height: "100%",
    width: "38%",
  }],
  rightView: {
    height: "100%",
    width: "30%",
    justifyContent: "center"
  },
  nameStyle: {
    fontSize: RF(2.5),
    color: Color.black,

    fontWeight: "500"
  },
  nameStyle2: {
    color: Color.grayClg,
    fontSize: RF(2)
  },
  paddingBottom5: {paddingBottom: 5},
};
