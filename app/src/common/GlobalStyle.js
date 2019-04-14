import Util from "./Util";
import Color from "./Color";

export default {
  container: {
    flex: 1
  },
  viewCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  viewFull: {
    height: "100%",
    width: "100%"
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },

  height5: {
    height: "5%"
  },

  height10: {
    height: "10%"
  },

  height15: {
    height: "15%"
  },

  height20: {
    height: "20%"
  },

  height25: {
    height: "25%"
  },

  height30: {
    height: "30%"
  },

  height40: {
    height: "40%"
  },

  height45: { height: "45%" },

  height50: {
    height: "50%"
  },

  height60: {
    height: "60%"
  },

  height70: {
    height: "70%"
  },

  height80: {
    height: "80%"
  },

  height90: {
    height: "90%"
  },

  height100: {
    height: "100%"
  },

  width60: { width: "60%" },

  width75: { width: "75%" },

  fullHeight: {
    height: Util.getHeight(100)
  },

  marginLeft15: { marginLeft: "15%" },

  divider: {
    height: 1,
    backgroundColor: Color.tabsColor,
    width: "90%",
    marginTop: "1%",
    marginBottom: "1%"
  },

  fullDivider: {
    backgroundColor: Color.inputBg,
    width: Util.getWidth(100),
    height: Util.getHeight(0.2)
  },

  width50: { width: "47%" },

  leftRightPadding: { paddingLeft: 20, paddingRight: 20 },

  width50p: { width: "50%" },

  width55p: { width: "55%" },

  width45p: { width: "45%" },

  width100p: {
    width: "100%"
  },
  alignSelfStart: { alignSelf: "flex-start" },
  alignSelfEnd: { alignSelf: "flex-end" },
  justifyContentCenter: { justifyContent: "center" },
  width40p: { width: "40%" },
  width25p: { width: "25%" },
  width10p: { width: "10%" },
  width90p: { width: "90%" },
  alignItemsFlexStart: { alignItems: "flex-start" },
  alignItemsFlexEnd: { alignItems: "flex-end" },
  borderWidth0: { borderWidth: 0 },
  width20p: { width: "20%" },
  alignSelfCenter: { alignSelf: "center" },
  alignItemsCenter: { alignItems: "center" }
};
