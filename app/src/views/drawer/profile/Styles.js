import RF from "react-native-responsive-fontsize";
import Color from "../../../common/Color";
import Util from "../../../common/Util";

export default {
	header: {
		fontSize: RF(3),
		color: Color.grayClg,
		marginTop: Util.getHeight(3),
		//marginLeft: '15%',
		fontWeight: 'bold'
	},

		lable: {
			fontSize: RF(2.3),
			color: Color.grayClg,
			marginTop: 15,
			marginLeft: '10%'
		},

		icon: { height: Util.getWidth(6), width: Util.getWidth(5) },

		btnView: { marginTop: 20, alignItems: "center", justifyContent: "center" },

		nameText: { textAlign: "center", fontSize: RF(3), color: Color.darkGray, fontWeight: 'bold' },

		countryText: { textAlign: "center", fontSize: RF(2.5), color: Color.grayClg, fontWeight: 'bold' },

		cameraIcon: {
			height: Util.getWidth(15),
			width: Util.getWidth(15),
			borderRadius: Util.getWidth(7),
			position: "absolute",
			bottom: 0,
			right: 0
		},

		profilePic: { height: Util.getWidth(40), width: Util.getWidth(40), borderRadius: Util.getWidth(20) },

		profilePicView: {
			borderRadius: 100,
			height: Util.getWidth(40),
			width: "100%",
			backgroundColor: "#FFFFFF",
			marginTop: Util.getHeight(2),
			alignItems: "center",
			justifyContent: "center"
		},

		btn: {
			padding: 15,
			backgroundColor: Color.appDefultColor,
			borderRadius: 50,
			width: "80%",
			alignItems: "center",
			justifyContent: "center"
		},

	iconView: {width: '10%', justifyContent: 'center'},	
	padding20: { padding: 20 },
	marginTop3p: {marginTop: '3%'},
	radioView: { marginTop: "1%", flexDirection: "row", marginLeft: "5%" },
};
