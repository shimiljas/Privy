import RF from "react-native-responsive-fontsize";
import Color from "../../common/Color";
import globalStyle from "../../common/GlobalStyle";
import Util from "../../common/Util";

export default {
	container: {
		height: "10%",
		width: "100%",
		flexDirection: "row",
		backgroundColor: Color.inputBg,
		borderBottomWidth: 2,
		borderBottomColor: Color.grayClg
	},
	backBg: [
		globalStyle.viewCenter,
		{
			color: Color.appDefaultColor,
			width: "15%",
			
		}
	],
	imageSize: {
		height: Util.getHeight(3),
		width: Util.getHeight(3)
	},
	imageSize2: {
		height: Util.getHeight(3.5),
		width: Util.getHeight(3.5)
	},
	backBtn: {
		margin: 3
	},
	titleBg: {
		width: "55%",
	
		justifyContent: "center"
	},
	titleText: {
		color: Color.darkGray,
		fontWeight: "bold",
		fontSize: RF(3)
	},
	saveBtn: [
		globalStyle.viewCenter,
		{
			fontSize: 20,
			color: Color.appDefaultColor
		}
	]
};
