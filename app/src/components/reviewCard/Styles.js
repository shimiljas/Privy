import Util from "../../common/Util";
import RF from "react-native-responsive-fontsize";
import Color from "../../common/Color";

export default {
	container: {
		height: Util.getHeight(30),
		width: Util.getWidth(100)
	},
	imagestyle: {
		height: Util.getHeight(9),
		width: Util.getHeight(9)
	},
	timeText: {
		flex:1,
		fontSize: RF(2),
		fontWeight: "400",
		color: Color.black,
		alignSelf: "center",
	},
	btn: {
		backgroundColor: Color.grayClg,
		width: Util.getWidth(55),
		height: Util.getHeight(6),

	},
	timeTextDesign: {
	
		fontSize: RF(2),
		fontWeight: "400",
		color: Color.black,
		
	},
	timeView: {
		flex:1,
		alignItems: "center",
		justifyContent: "center",
	},
	lessonsArea: {
		height: Util.getHeight(9),
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: "5%"
	},
	lessonText: {
		fontSize: RF(3.5),
	    flex:1.2,
		fontWeight: "900",
		color: Color.grayClg,
		alignSelf: "center"
	},
	line: {
		height: 1,
		backgroundColor: Color.inputBg,
		width: "100%"
	},
	textArea: {
		width: "100%",
		marginBottom: "2%"
	},
	timeStyle: {
		fontSize: RF(2)
	},

	btnText: {
		fontSize: RF(2.2),
		color: "white",
		fontWeight: "800"
	},
	nameStyle: {
		fontSize: RF(2),
		marginVertical: "2%",
		
	},
	nameStyle2: {
		color: Color.black,
		fontWeight: "900"
	},
	contentArea: {
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: "6%"
	},
	cardArea: {
		height: Util.getHeight(32),
		width: Util.getWidth(90),
		marginVertical:Util.getHeight(2),
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

	detailsbtn: {
		alignSelf: "flex-end",
		width: "65%"
	},
	detailsText: {
		color: Color.linkText,
		fontSize: RF(2.2),
		textDecorationColor: Color.linkText,
		textDecorationLine: "underline",
		textDecorationStyle: "solid"
	}
};
