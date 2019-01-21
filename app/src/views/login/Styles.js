import Util from "../../common/Util";
import theme from "../../common/Color";
import RF from "react-native-responsive-fontsize";
import Color from "../../common/Color";
import GlobalStyle from "../../common/GlobalStyle";
export default {
	
	inputText: {
		fontSize: RF(2),
		color: "black"
	},
	tabText: {
		width: Util.getWidth(50)
	},
	loginBgImg: {
		marginTop: -Util.getWidth(3),
		width: Util.getWidth(100),
		height: Util.getHeight(55)
	},

	logoImage: {
		height: Util.getHeight(15),
		alignSelf: "center"
	},
	loginBg: {
		marginTop: Util.getHeight(9),
		width: Util.getWidth(80),
		height: Util.getHeight(40)
	},
	formView: [
		GlobalStyle.viewCenter,
		{
			backgroundColor: "white",
			opacity: 1,
			width: "80%",
			height: "35%"
		}
	],
	signBgImg: {
		marginTop: -Util.getWidth(7),
		width: Util.getWidth(100),

		height: Util.getHeight(75)
	},
	modelView: {
		position: "absolute",
		left: 50,
		height: "20%",
		padding: "5%"
	},
	signBg: {
		marginTop: Util.getHeight(9),
		width: Util.getWidth(80),
		height: Util.getHeight(75)
	},
	inputField: {
		marginTop: 10,
		height: 60,
		backgroundColor: theme.inputBg,
		borderColor: "gray",
		borderWidth: 1
	},
	errorText: {
		color: "red",
		marginTop: Util.getWidth(10)
	},
	errorView: {
		width: Util.getWidth(80),
		justifyContent: "center",
		alignItems: "flex-start",
        marginTop: 2,
        marginLeft: Util.getWidth(15)
	},
	btn: {
		marginTop: Util.getWidth(3),
		backgroundColor: theme.appDefultColor,
		width: Util.getWidth(75),
		height: Util.getHeight(7),
		marginBottom: Util.getHeight(10)
	},

	wrapper: {
		flexDirection: "row",
		justifyContent: "center",
		flex: 0.2,
		alignItems: "center",
		paddingTop: 0,
		marginTop: 0
	},

	rectangle: {
		width: Util.getWidth(87),
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		height: Util.getHeight(45),
		borderRadius: 10,
		overflow: "hidden"
	},

	newHeight: {
		height: Util.getHeight(60)
	},

	agreeText: {
		fontSize: RF(2.8),
		color: Color.grayClg,
		//marginLeft: Util.getWidth(5),
		//marginTop: Util.getHeight(1),
		alignSelf: "flex-start"
	},

	lable: {
		fontWeight: "500",
		fontSize: RF(3)
	},

	greyColor: {
		color: theme.grayClg
	},

	blackColor: {
		color: theme.black
	},

	row: {
		flexDirection: "row"
	},

	titleLable: {
		flexDirection: "row",
		marginTop: Util.getHeight(7)
	},

	btnPadding: {
		borderRadius: Util.getWidth(40),
		marginTop: Util.getHeight(1),
	},

	topFieldSpacing: {
		marginTop: Util.getWidth(20),
		width: Util.getWidth(75),
		height: Util.getHeight(6)
	},

	width75: {
		width: Util.getWidth(75)
	},

	btnText: {
		fontSize: RF(2.5),
		color: "white"
	},

	logo: {
		width: Util.getWidth(50),
		height: Util.getHeight(10),
		backgroundColor: "#0B5604",
		borderBottomLeftRadius: 25,
		borderBottomRightRadius: 25,

		justifyContent: "center",
		flexDirection: "row"
	},
	errorText: { color: Color.red }
};
