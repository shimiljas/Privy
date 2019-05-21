import Util from "../../common/Util";
import RF from "react-native-responsive-fontsize";
import Color from "../../common/Color";
import GlobalStyle from "../../common/GlobalStyle";

export default {
  container: {
    height: Util.getHeight(30),
    width: Util.getWidth(100)
  },
  completeView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  imageView: {
    height: "75%",
    width: "30%",
    alignItems: "center"
  },
  textContainer: {
    height: "75%",
    width: "45%"
  },
  imagestyle: {
    height: Util.getHeight(9),
    width: Util.getHeight(9)
  },
  prizeView: {
    height: "75%",
    width: "24%",
    paddingLeft: "4%"
  },
  row: {
    flexDirection: "row"
  },
  extraView: {
    height: "30%",
    width: "100%"
  },
  lineV: {
    height: "75%",
    width: 1,
    backgroundColor: Color.grayClg
  },
  line: {
    height: 1,
    backgroundColor: Color.inputBg,
    width: "100%"
  },
  textArea: {
    width: "100%",
    marginBottom: "2%"
  },
  timeStyle: {
    fontSize: RF(2)
  },
  btn: {
    alignSelf: "flex-end",
    backgroundColor: Color.appDefultColor,
    width: Util.getWidth(35),
    height: Util.getHeight(5),
    marginRight: "3%"
  },
  btnText: {
    fontSize: RF(2),
    color: "white",
    fontWeight: "800"
  },
  nameStyle: {
    fontSize: RF(1.8),
    margin: "1%"
  },
  nameStyle2: {
    color: Color.black,
    fontWeight: "400"
  },
  contentArea: [
    GlobalStyle.viewCenter,
    {
      height: "100%",
      marginHorizontal: "6%"
    }
  ],
  cardArea: {
    height: Util.getHeight(32),
    width: Util.getWidth(90),
    marginVertical: Util.getHeight(2),
    backgroundColor: Color.whiteClr,
    padding: 5,
    shadowColor: Color.modelBackground,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  newCard: {
    height: Util.getHeight(17)
  },
  detailsbtn: {
    alignSelf: "flex-end",
    width: "70%"
  },

  detailsText: {
    color: Color.linkText,
    fontSize: RF(2.2),
    fontWeight: "400",
    textDecorationColor: Color.linkText,
    textDecorationLine: "underline",
    textDecorationStyle: "solid"
  }
};
