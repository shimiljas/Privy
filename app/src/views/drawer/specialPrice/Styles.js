import RF from "react-native-responsive-fontsize";
import Color from "../../../common/Color";
import Util from "../../../common/Util";

export default {
	tabUnderline: {
		borderBottomColor: "white",
		borderBottomWidth: 5
	},
	tab: {
		backgroundColor: Color.tabsColor
	},
	activeTab: {
		backgroundColor: "green"
	},
	headerTitle: {
		fontSize: RF(3.5),
		color: Color.grayClg,
		padding: "5%",
		fontWeight: "bold"
	},
	tabText: {
		color: Color.grayClg
	},
	title: { fontSize: RF(3), color: Color.grayClg, fontWeight: "bold" },

	menuIcon: { height: Util.getWidth(6), width: Util.getWidth(5) },

	circleMenuIcon: { height: Util.getWidth(5), width: Util.getWidth(5) },

	margin15: { margin: 15 },

	flexGrow: { flexGrow: 1 },

	mainTitleView: { width: "75%", justifyContent: "center" },

	btn: {
		marginTop: 20,
		marginLeft: "10%",
		padding: 15,
		backgroundColor: Color.appDefultColor,
		borderRadius: 50,
		width: "80%",
		alignItems: "center",
		justifyContent: "center"
	},

	anotherBtn: {
		marginTop: 20,
		marginBottom: 20,
		marginLeft: "10%",
		padding: 15,
		backgroundColor: Color.grayClg,
		borderRadius: 50,
		width: "80%",
		alignItems: "center",
		justifyContent: "center"
	},

	orText: {
		//alignSelf: 'center',
		fontSize: RF(3),
		color: Color.grayClg,
		fontWeight: "bold",
		marginTop: 15,
		marginLeft: "10%"
	},

	lable: {
		fontSize: RF(2.3),
		color: Color.grayClg,
		marginTop: 15,
		marginLeft: "10%"
	},
	mainView: { flex: 1, padding: '3%' },
	height2p: { height: "2%" },
	dividerStyle: { marginLeft: "10%", width: "90%" },
	marginTop5p: { marginTop: "5%" },
	
};
