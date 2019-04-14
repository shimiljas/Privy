import RF from "react-native-responsive-fontsize";
import Color from "../../common/Color";
import Util from "../../common/Util";
import GlobalStyle from "../../common/GlobalStyle";

export default {
  containerBack: {
    margin: Util.getHeight(5),
    marginTop: Util.getHeight(2),
    backgroundColor: Color.whiteClr,
    borderRadius: 10,
    padding: 10,
    shadowColor: Color.modelBackground,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },

 
  title: {
    fontFamily: "Cochin",
    color: Color.appDefultColor,
    fontSize: RF(4),
    fontWeight: "900",
    textDecorationLine: "underline"
  },

  formView: [
    GlobalStyle.viewCenter,
    {
      backgroundColor: "white",
      opacity: 1,
      borderRadius: 5,
      width: "80%",
      height: "30%"
    }
  ],

  modelView: {
    position: "absolute",
    left: 50,
    height: "20%",
    padding: "5%"
  },

  inputField: {
    marginTop: 10,
    height: 60,
    backgroundColor: Color.inputBg,
    borderColor: "gray",
    borderWidth: 1
  },

  errorView: {
    width: Util.getWidth(80),
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 5,
    marginLeft: Util.getWidth(15)
},
  btn: {
    marginTop: Util.getWidth(5),
    backgroundColor: Color.appDefultColor,
    width: Util.getWidth(75),
    height: Util.getHeight(7),
    marginBottom: Util.getHeight(3)
  },

  btnText: {
    fontSize: RF(2.5),
    color: "white"
  },
  errorText: { color: Color.red },
  modelBtn: {
    width: "80%",
    marginTop: 0,
    marginBottom: 0
  },
  modelBtnView: {
    height: "20%",
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
    color: Color.black,
    height: "20%",
    fontWeight: "900",
    marginLeft: "3%",
    marginBottom: "1%"
  },
  modelTextView: {
    height: "66%",
    width: "100%"
  },
  closeImage: {
    height: Util.getHeight(7),
    alignSelf: "flex-end",
    marginTop: Util.getHeight(3)
},
closeImageView: [
    GlobalStyle.viewCenter,
    {
        marginTop: Util.getHeight(5),
        height: Util.getHeight(15),
        width: Util.getWidth(95),
        alignItems: "flex-end"
    }
],
  pageTitle: [
    GlobalStyle.viewCenter,
    {
      height: Util.getHeight(15),
      justifyContent: "center",
      alignItems: "center"
    }
  ]
};
