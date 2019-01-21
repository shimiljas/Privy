import RF from "react-native-responsive-fontsize";
import Util from "../../common/Util";

export default {
  space: {
    height: Util.getHeight(4)
  },
  imageValText: {
    position: "absolute",
    fontSize: RF(2)
  },
  imageAreaView: {
    height: "30%",
    width: "100%"
  },
  imageView: {
    flex: 1,
    aspectRatio: 0.5,
    resizeMode: "contain"
  },
  amountAreaText: {
    height: "10%",
    width: "90%"
  },
  card: {
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 15,
    width: Util.getWidth(42),
    height: Util.getHeight(35)
  },

  headerText: {
    fontSize: RF(2.7),
    color: "#aeb5bc",
    fontWeight: "500",
    textAlign: "center"
  },

  valueText: {
    color: "#aeb5bc",
    fontSize: RF(2),
    position: "absolute",
    bottom: 0
  },

  bottomImageArea: {
    height: "25%",
    width: "100%",
    marginTop: "5%"
  },
  bottomImageArea2: {
    width: "70%",
    height: "70%"
  },
  bottomImage: {
    width: "30%",
    height: "90%"
  },
  valueAreaText: {
    height: "10%",
    width: "100%",
    alignItems: "center"
  },
  amountText: {
    color: "black",
    fontSize: RF(3),
    fontWeight: "500"
  }
};
