import Util from "../../common/Util";
import RF from "react-native-responsive-fontsize";
import Colors from "../../common/Color";
export default {
  // tabBarStyle: {
  // 	height: 60,
  // 	backgroundColor: "#eee"
  // },
  // tabBarSelectedItemStyle: {
  // 	backgroundColor: "#ddd"
  // },
  titleText: {
    fontSize: RF(2.5),
    color: "#AAAAAA",
    fontFamily: "Poppins",
    textAlign: "left",
    marginLeft: "6%"
  },
  titleSelected: {
    fontSize: RF(2.6),
    color: "#FFFFFF",
    fontFamily: "Poppins-Medium",
    textAlign: "left",
    marginLeft: "6%"
  },
  // tabChatBarStyle: {
  // 	height: 60,
  // 	backgroundColor: "#eee"
  // },
  // tabChatLableStyle: {
  // 	height: 60,
  // 	color: "#000",
  // 	fontSize: RF(3),
  // 	fontWeight: "bold"
  // },

  rowBg: {
    justifyContent: "center",
    paddingVertical: "6%",
    backgroundColor: Colors.appDefultColor
  },
  // rowBgSelected: {
  // 	height: Util.getHeight(5),
  // 	justifyContent: "center",
  // 	marginLeft: 0,
  // 	backgroundColor: "#C9C9C9"
  // },

  width40: {
    width: "40%"
  },

  imageView: {
    borderRadius: Util.getWidth(11),
    height: Util.getWidth(22),
    width: Util.getWidth(22),
    backgroundColor: "#FFFFFF"
  },

  image: {
    borderRadius: Util.getWidth(8),
    height: Util.getWidth(16),
    width: Util.getWidth(16),
    marginLeft: "2%",
    marginTop: "2%"
  },

  userNameView: {
    alignItems: "flex-start",
    width: "68%",
    justifyContent: "center"
  },

  userName: {
    marginHorizontal: "2%",
    color: Colors.grayClg,
    fontFamily: "Poppins-Bold",
    fontSize: RF(3)
  },

  borderView: {
    backgroundColor: Colors.modelBackground,

    height: Util.getHeight(0.1),
    marginTop: Util.getHeight(1)
  },

  menuText: {
    width: "90%",
    justifyContent: "center",
    fontFamily: "Poppins-Medium"
  },

  icons: {
    width: Util.getWidth(6),
    height: Util.getWidth(6)
  },

  menuItem: {
    marginLeft: "7%",
    flexDirection: "row"

    // borderBottomColor: 'red',
    // borderBottomWidth: 1,
  },

  menuHeader: {
    padding: 0,
    height: "20%",
    marginBottom: "2%",
    backgroundColor: "#0b5604"
  },

  width5p: { width: Util.getWidth(2) },

  width1p: { width: Util.getWidth(5) },

  width19p: { width: Util.getWidth(19) }
};
