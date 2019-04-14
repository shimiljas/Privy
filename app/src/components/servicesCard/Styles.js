import Util from "../../common/Util";
import RF from "react-native-responsive-fontsize";
import Color from "../../common/Color";

export default {
	topRightBtn: {
		backgroundColor: Color.appDefultColor
	},
	title: {
		fontSize: RF(3.0),
		fontFamily: "Poppins-Medium",
		color: Color.grayClg
	},
	titleView: {
		// position: "absolute",
		// //top: 10,
		// left: "8%"
	},

	imageView: { position: "absolute", top: 0, right: 0 },

	moreIcon: {width: 32, height:32,  resizeMode: "contain"},
	height35p: { height: "35%",  paddingRight:5, },
	cardStyle: {
		marginBottom: "5%",
		borderWidth: 1,
		height: Util.getHeight(50)
	},
};
