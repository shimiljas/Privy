import RF from "react-native-responsive-fontsize";
import Util from "../../common/Util";

export default {
  space: {
    height: Util.getHeight(2)
  },
  imageValText: {
    position: "absolute",
    fontSize: RF(2)
  },
  imageAreaView: {
    height: 48,
    width: 48,
    margin: 5
  },
  imageView: {
    flex: 1,
    resizeMode: "contain"
  },
  amountAreaText: {
    height: "10%",
    width: "90%",
    marginVertical: 5
  },
  card: {
    marginTop: 5,
    marginRight: 10,
    borderRadius: 15,
    width: Util.getWidth(42),
    height: Util.getHeight(35)
  },

  headerText: {
    fontSize: RF(3),
    color: "#aeb5bc",
    fontFamily: "Poppins-Bold",
    textAlign: "center"
  },

  valueText: {
    color: "#aeb5bc",
    fontSize: RF(2),
    position: "absolute",
    fontFamily: "Poppins-Medium",
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
    alignItems: "center",
    fontFamily: "Poppins-Medium"
  },
  amountText: {
    color: "black",
    fontSize: RF(3),
    fontFamily: "Poppins-Bold"
  }
};
