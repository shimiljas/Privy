import FS from "react-native-responsive-fontsize";

import Color from "../../../common/Color";
import Util from "../../../common/Util";
import GlobalStyle from "../../../common/GlobalStyle";
export default {
  padding10: { padding: 10 },
  margin15: { margin: 10 },
  flexGrow: {  flexGrow:1 },
  modelBtnView: {
    height: "20%",
    width: "100%",
    marginTop: "10%",
    alignItems: "center",
    alignSelf: "center"
  },

  title: {
    fontSize: FS(2.5),
    fontFamilyt: "Poppins-Medium",
    color: Color.grayClg
  },

  listArea: {
    height: Util.getHeight(100),
    width: "100%",
    padding: Util.getWidth(3)
  },

  name: { color: Color.darkGray, fontSize: FS(3.5), fontWeight: "bold" },

  categoryTitle: {
    color: Color.grayClg,
    fontSize: FS(3.5),
    fontWeight: "bold"
  },

  lable: {
    fontSize: FS(2),
    color: Color.grayClg
  },

  subCategoryTitle: {
    fontSize: FS(2.5),
    color: Color.darkGray,
    marginTop: Util.getHeight(1)
  },

  btn: {
    padding: 10,
    backgroundColor: Color.appDefultColor,
    borderRadius: 50,
    width: Util.getWidth(35),
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10%"
  },

  backBtn: {
    padding: 10,
    backgroundColor: Color.grayClg,
    borderRadius: 50,
    width: Util.getWidth(35),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "10%"
  },

  profileImageBgStyle: {
    height: Util.getWidth(18),
    width: Util.getWidth(18),
    borderRadius: Util.getWidth(9),
    borderWidth: 1,
    borderColor: Color.grayClg,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },

  profileImageStyle: {
    height: Util.getWidth(16),
    width: Util.getWidth(16),
    borderRadius: Util.getWidth(8)
  },
  formView: [
    GlobalStyle.viewCenter,
    {
      backgroundColor: "white",
      opacity: 1,
      borderRadius: 5,
      width: "80%",
      height: "45%",
      padding: "5%"
    }
  ],

  modelView: {
    position: "absolute",
    left: 50,
    height: "30%",
    padding: "5%"
  },

  modelBtn: {
    width: "80%",
    marginTop: 0,
    marginBottom: 0,
    padding: 5,
    backgroundColor: Color.appDefultColor
  },
  modelBtnView: {
    height: "20%",
    width: "100%",
    marginTop: "10%",
    alignItems: "center",
    alignSelf: "center"
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
    fontSize: FS(3),
    color: Color.grayClg,
    height: "20%",
    fontWeight: "900",
    marginLeft: "3%",
    marginBottom: "1%"
  },
  modelTextView: {
    height: "75%",
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
    width: Util.getWidth(20),
    height: Util.getHeight(20)
  },
  successMessage: {
    fontSize: FS(4),
    fontWeight: "bold"
  },
  btnText: {
    fontSize: FS(2.5),
    color: "white"
  },
  marginTop2: { marginTop: Util.getHeight(2) },
  mainTitleView: { marginBottom: Util.getHeight(1), padding: Util.getWidth(3) },
  basicDetailsView: { height: Util.getHeight(15), padding: Util.getWidth(3) },
  descriptionView: { padding: Util.getWidth(5), paddingTop: 0 },
  padding5: { padding: Util.getWidth(5) },
  userDetailsView: {
    width: Util.getWidth(64),
    padding: Util.getWidth(1),
    justifyContent: "center"
  },
  btnView: {
    marginTop: Util.getHeight(2),
    marginBottom: Util.getHeight(3),
    justifyContent: "center",
    alignItems: "center"
  }
};
