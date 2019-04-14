import FS from "react-native-responsive-fontsize";
import Color from "../../../../common/Color";
import Util from "../../../../common/Util";

export default {
	lessonsArea: {
		height: Util.getHeight(9),
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: "5%"
	},
	lessonText: {
		fontSize: FS(3.5),
		flex: 1.6,
		fontWeight: "900",
		color: Color.grayClg,
		alignSelf: "center"
	},
	combineText: {
		fontSize: FS(2),
		flex: 0,
		fontWeight: "400"
	},
	timeText: {
		flex: 1,
		fontSize: FS(2),
		fontWeight: "400",
		color: Color.black,
		alignSelf: "center"
	},
	listArea: {
		height: Util.getHeight(100),
		width: "100%"
	}
};
