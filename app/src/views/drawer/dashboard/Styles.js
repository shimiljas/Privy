import RF from "react-native-responsive-fontsize";
import theme from "../../../common/Color";
import Util from "../../../common/Util";

export default {
	container:{
		flex: 1 
	},
	btnText: {
		fontSize: RF(2.5),
		color: "white"
	},
	buttonArea: {
		height: "15%",
		width: "100%"
	},
	btn: {
		backgroundColor: theme.appDefultColor,
		width: Util.getWidth(75),
		height: Util.getHeight(7)
	},
	flatlist: {
		//height:'80%',
		padding: "2%",
		paddingTop: "2%"
	},
	btnView: {
		height: "10%",
		width: "100%"
	}
};
