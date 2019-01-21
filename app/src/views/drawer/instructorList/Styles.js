import FS from "react-native-responsive-fontsize";
import Color from "../../../common/Color";
import Util from "../../../common/Util";

export default {
	cardStyle: {padding: '2%',height: Util.getHeight(18), width: '98%',marginBottom: Util.getHeight(2)},
	listArea: {
		height: Util.getHeight(75),
		width: "100%"
	},
	title: {
		fontSize: FS(2.5),
		fontWeight: "bold",
		color: Color.grayClg
	},
	cardArea: {
		height: "70%",
		width: "100%",
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
	imagestyle: {
		marginTop: Util.getHeight(2),
		height: Util.getWidth(5),
		width: Util.getWidth(5)
	},
	profileImageStyle: {
		height: Util.getHeight(12),
		width: Util.getHeight(12)
	},
	flexGrow: {flexGrow: 1},

	name: {color: Color.darkGray, fontSize:FS(2)},

	userName: {fontSize:FS(2), color: Color.linkColor, textDecorationLine: 'underline'},

	link: {
		color: Color.linkColor,
		fontSize:FS(2),
		textDecorationLine: 'underline'
	},

	profileImageView: { width: "25%", justifyContent: "center", alignItems: "center" },
	userDetailsView: { width: "45%", padding: '1%', paddingLeft: '5%' },
	dividerView: { height: "50%", width: 1, backgroundColor: Color.grayClg, marginTop: '3%' },
	rightView: { width: "30%", padding: '1%', paddingLeft: '5%' },
	marginBottom1: {marginBottom: Util.getHeight(1)},
	pickerBottomLine: {width: '60%', borderBottomWidth: 1, borderBottomColor: Color.grayClg},
};
