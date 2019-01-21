import RF from "react-native-responsive-fontsize";
import Util from "../../common/Util";
import Color from "../../common/Color";

export default {
  topRightBtn: {
    backgroundColor: Color.appDefultColor
  },
  title: {
    fontSize: RF(3.3),
    fontWeight: "bold",
    color: Color.grayClg
  },
  titleView: {
    position: "absolute",
    //top: 10,
    left: Util.getWidth(6)
  },

  imageView: { position: "absolute", top: 0, right: 0 },

  btn100p: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: Color.appDefultColor,
    borderRadius: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },

  btn85p: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: Color.appDefultColor,
    borderRadius: 50,
    width: "90%",
    alignItems: "center",
    justifyContent: "center"
  },

  lable: { fontSize: RF(2), color: Color.grayClg },

  value: { fontSize: RF(2.5), color: Color.darkGray },

  moreIcon: { width: Util.getWidth(9), height: Util.getWidth(7) },

  cardStyle: {
    marginBottom: "5%",
    borderWidth: 1,
    height: Util.getHeight(70)
  },

  marginLeft5p: { marginLeft: "5%" },

  marginBottom5p: { marginBottom: "5%" },

  marginTop4p: { marginTop: "4%" },
  menuContext: {
    backdrop: {
      backgroundColor: "#000",
      opacity: 0.6
    }
    //flex: 1,
    //top: Util.getHeight(1),
    //height: Util.getHeight(70),
    //alignItems: "center",
    //justifyContent: "center",
    //paddingTop: "1%"
    //backgroundColor: "#ecf0f1"
  }
};
