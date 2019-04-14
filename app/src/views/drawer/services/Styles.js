import RF from "react-native-responsive-fontsize";
import Util from "../../../common/Util";
import Color from "../../../common/Color";
import GlobalStyle from "../../../common/GlobalStyle";

export default {
  flexGrow: { flexGrow: 1 },

  //height60: {height: 60},

  title: {
    fontSize: RF(3),
    fontFamily: "Poppins-Medium"
  },

  closeBtn: {
    width: Util.getWidth(12),
    height: Util.getWidth(12)
  },
  btnPadding: {
    //marginTop: Util.getHeight(10),
    borderRadius: Util.getWidth(50),
    marginRight: Util.getWidth(5)
  },
  marginTop2p: { marginTop: "2%" },
  subTitle: { fontSize: RF(2.7), color: Color.grayClg },
  btn: {
    padding: 6,
    backgroundColor: Color.appDefultColor,
    borderRadius: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  btn85p: {
    padding: 4,
    backgroundColor: Color.appDefultColor,
    borderRadius: 50,
    width: "85%",
    alignItems: "center",
    justifyContent: "center"
  },
  btnView: [
    GlobalStyle.viewCenter,
    {
      width: "100%"
    }
  ],
  text: { fontSize: RF(2.5) },
  lessonTitle: {
    fontSize: RF(3),
    color: Color.grayClg
  },

  modelView: { backgroundColor: "#00000077" },

  formView: {
    backgroundColor: "white",
    opacity: 1,
    padding: 10,
    width: "90%"
  },

  height5p: { height: "5%" },

  height15p: { height: "15%" },

  height40p: { height: "40%" },
  height20p: { height: "20%" },

  categoryPicker: { height: 60, width: "100%", color: Color.grayClg },

  lessonTitleView: { height: "10%" },

  marginBottom10: { height: Util.getHeight(7), marginBottom: "7%" },

  mainTitleView: { flex: 1, justifyContent: "center", paddingLeft: "10%" },

  menuIcon: {},

  margin15: { margin: 15 },

  //height10p: { height: "10%" },
  closeBtnStyle: { width: "85%", alignItems: "flex-end", marginBottom: "7%" },
  marginTop1p: { marginTop: "1%" },
  marginTop5p: { marginTop: "5%" }
};
