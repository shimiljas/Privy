import RF from "react-native-responsive-fontsize";
import Color from "../../../common/Color";
import Util from "../../../common/Util";

export default {
	title: {
		color: Color.darkGray,
        fontSize: RF(3.5),
        fontWeight: 'bold'
	},
	lable: {
		fontSize: RF(2.5),
		color: Color.grayClg
	},
	datelable: {
		fontSize: RF(2.5),
		color: Color.darkGray
	},

	btn: {
		padding: 10,
		backgroundColor: Color.appDefultColor,
		borderRadius: 50,
		width: "50%",
		alignItems: "center",
		justifyContent: "center"
	},
	marginTopBottom4: {
		marginTop: Util.getHeight(4),
		marginBottom: Util.getHeight(4)
	},
	marginTop2p: { marginTop: "2%" },
	marginTop5p: { marginTop: "5%" },
	marginBottom3: { marginBottom: Util.getWidth(3) },
	margin5: { margin: Util.getWidth(5) },
	mainView: { backgroundColor: "#f0f0f0", height: Util.getHeight(100) },
	activeTabText: { color: "#fff", fontWeight: "normal" },
	tabStyle: { backgroundColor: Color.whiteClr },
	tabTextStyle: { color: Color.grayClg },
	activeTabStyle: { backgroundColor: Color.appDefultColor }
};
