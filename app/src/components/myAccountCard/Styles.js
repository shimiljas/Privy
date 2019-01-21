import Util from "../../common/Util";
import RF from "react-native-responsive-fontsize";

export default {
	//MyAccountStyle: {
		lableText: {
			color: "#41444b",
			fontSize: RF(3),
			marginLeft: Util.getWidth(12),
			fontWeight: "bold",
			marginBottom: Util.getHeight(2)
		},

		planPriceText: {
			fontSize: RF(2.5),
			//marginLeft: Util.getWidth(4),
			fontWeight: "bold",
			color: "#41444b",
			lineHeight: 35
		},

		planText: {
			textAlign: "center",
			fontSize: RF(2)
		},

		btn: {
			padding: 5,
			borderRadius: 50,
			width: "80%",
			alignItems: "center",
			justifyContent: "center"
		},

		smallbtn: {
			padding: 5,
			borderRadius: 50,
			width: "45%",
			alignItems: "center",
			justifyContent: "center"
		},

		greenColor: {
			backgroundColor: "#0b5604"
		},

		greyColor: {
			backgroundColor: "#AEB5BC"
		},

		btnText: {
			color: "white",
			alignSelf: "center",
			fontSize: RF(2)
		},

		boxBorder: {
			borderWidth: 1,
			borderRadius: 10,
			borderColor: "#E5E5E5",
			borderBottomWidth: 0,
			shadowColor: "#E5E5E5",
			shadowOffset: { width: 10, height: 10 },
			shadowOpacity: 0.8,
			shadowRadius: 2,
			elevation: 1,
			marginLeft: Util.getWidth(2),
			marginRight: Util.getWidth(5),
			marginTop: 10,
			padding: 20,
			width: Util.getWidth(40),
			height: Util.getHeight(25),
			backgroundColor: "white"
		},

		boxBorderBottom: {
			marginBottom: Util.getHeight(6)
		},

		background: {
			backgroundColor: "#F0F0F0"
		},

		margin5: {
			margin: Util.getWidth(5)
		},

		planCard: {
			width: Util.getWidth(42),
			borderRadius: 10
		},

		row: {
			//flex: 1,
			flexDirection: "row"
		},

		firstCardRightMargin: {
			marginRight: Util.getWidth(5)
		},

		center: {
			justifyContent: "center",
			alignItems: "center"
		},

		planCardWidth: {
			width: Util.getWidth(28),
			borderRadius: 10
		},

		planIcon: {
			height: Util.getHeight(4),
			marginTop: Util.getHeight(3)
		},

		checkbox: { borderRadius: 50 },

		fontSize16: {
			fontSize: RF(1)
		},

		fontSize18: {
			fontSize: RF(2)
		},

		selectedPlanText: {
			width: Util.getWidth(50),
			marginLeft: Util.getWidth(10),
			marginTop: Util.getHeight(3)
		},

		seperator: {
			backgroundColor: "black",
			width: Util.getWidth(100),
			height: Util.getHeight(0.2)
		},

		paymentCard: {
			flex: 1,
			flexDirection: "row",
			width: "100%",
			height: "100%"
		},

		paypalImgView: {
			width: "60%"
		},

		paypalAutoWithdrawalView: { width: "40%", flex: 1, flexDirection: "row" },

		fieldSpacing: { marginTop: Util.getWidth(5), width: Util.getWidth(75), height: Util.getHeight(6) },

		textSize16: { fontSize: RF(2) },

		marginTop12: {
			marginTop: 12
		},

		marginTop25: {
			marginTop: 25
		}
	//}
};
