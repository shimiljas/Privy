import RF from "react-native-responsive-fontsize";
import Color from "../../../common/Color";
import Util from "../../../common/Util";
import GlobalStyle from "../../../common/GlobalStyle";

export default {
  contentStyle: {
    backgroundColor: Color.tabsColor
  },
  bookArea: {
    marginBottom: Util.getWidth(3),
    margin: Util.getWidth(1)
  },
  title: {
    color: "#828282",
    fontSize: RF(2.5)
  },
  // line: {
  //   marginBottom: "2%"
  // },
  calenderView: {
    height: Util.getHeight(50),
    width: "100%",
    backgroundColor: "transparent"
  },
  lessonsArea: {
    justifyContent: "center",
    marginTop: Util.getHeight(1),
    marginBottom: Util.getHeight(1),
    margin: Util.getWidth(1)
  },
  transparent: {
    position: "absolute",
    height: "100%",
    width: "100%",

    backgroundColor: "transparent"
  },
  lessonsArea2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },

  lessonText: {
    alignSelf: "flex-start"
  },
  priceView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  nextLine: {
    marginTop: "2%",
    marginBottom: "5%"
  },

  nextLine2: {
    marginTop: "5%"
  },

  timeSlotArea: {
    width: "40%"
  },
  toText: {
    width: "20%"
  },
  amtLable: {
    color: Color.darkGray,
    fontSize: RF(3),
    fontWeight: "bold"
    //justifyContent: 'center',
  },
  startTimeText: {
    marginLeft: 10,
    marginTop: 5,
    fontSize: RF(2)
  },

  payBtnText: { alignSelf: "flex-end", color: "#004b84", fontSize: RF(2) },

  marginBottom: {
    marginBottom: Util.getHeight(2)
  },

  lable: {
    fontSize: RF(3),
    color: Color.grayClg,
    fontWeight: "bold"
  },

  btn: {
    padding: 15,
    backgroundColor: Color.appDefultColor,
    borderRadius: 50,
    width: Util.getWidth(35),
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10%"
  },

  backBtn: {
    padding: 15,
    backgroundColor: Color.grayClg,
    borderRadius: 50,
    width: Util.getWidth(35),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10%"
  },

  orText: { color: Color.darkGray, fontSize: RF(3), fontWeight: "bold" },

  formView: [
    GlobalStyle.viewCenter,
    {
      backgroundColor: "white",
      opacity: 1,
      borderRadius: 5,
      width: "80%",
      height: "50%"
    }
  ],

  modelView: {
    position: "absolute",
    left: 50,
    height: "30%",
    padding: "5%"
  },

  modelBtn: {
    width: "40%",
    marginTop: 0,
    marginBottom: 0,
    padding: 15,
    backgroundColor: Color.appDefultColor
  },
  modelBtnView: {
    height: "15%",
    width: "100%"
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: Color.grayClg
  },
  modelText: [
    GlobalStyle.viewCenter,
    {
      marginHorizontal: "5%",
      height: "60%"
    }
  ],
  modelSuccess: {
    fontSize: RF(3),
    color: Color.grayClg,
    height: "20%",
    fontWeight: "900",
    marginLeft: "3%",
    marginBottom: "1%"
  },
  modelTextView: {
    height: "66%",
    width: "100%"
  },
  closeImageView: [
    GlobalStyle.viewCenter,
    {
      marginTop: Util.getHeight(5),
      height: Util.getHeight(15),
      width: Util.getWidth(90)
    }
  ],
  imageStyle: {
    width: Util.getWidth(15),
    height: Util.getWidth(15)
  },
  successMessage: {
    fontSize: RF(4),
    fontWeight: "bold",
    marginTop: Util.getHeight(4)
  },
  btnView: {
    alignItems: "center",
    width: "50%"
  },
  btnText: {
    fontSize: RF(2.5),
    color: "white"
  },
  sameIcon: {
    height: 18,
    width: 18,
    marginTop: "2%",
    marginLeft: 15,    
  }
};
