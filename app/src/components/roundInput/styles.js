
import RF from "react-native-responsive-fontsize";
import Color from "../../common/Color";
import GlobalStyle from "../../common/GlobalStyle";
import Util from "../../common/Util";

export default {
	iconBg: [
		GlobalStyle.viewCenter,
		{
			width: "20%"
		}
	],
	iconView: {
		color: Color.grayClg,
		fontSize: RF(4)
	},
	fieldSpacing: {
		marginTop: Util.getWidth(2),
		width: "90%",
		height: Util.getHeight(8)
	},
	inputBg: {
		width: "80%",
		justifyContent: "center"
	},
	textSize16: { fontSize: RF(2.4) }
};
