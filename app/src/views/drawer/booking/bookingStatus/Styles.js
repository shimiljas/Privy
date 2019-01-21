import FS from "react-native-responsive-fontsize";
import Color from "../../../../common/Color";
import Util from "../../../../common/Util";
import GlobalStyle from '../../../../common/GlobalStyle'

export default {
	lessonsArea: {
		height: Util.getHeight(9),
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingLeft: "5%"
	},
	bookingView:{
		flex: 1.6 
	},
	noRecord:[GlobalStyle.viewCenter,GlobalStyle.viewFull,{
      
	}],
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
		height: Util.getHeight(70),
		width: "100%"
	},

	//Tabs style
	tabsView:{
		borderBottomWidth: 0, 
		height: 0 
	},
	tabStyle:{
		backgroundColor: Color.whiteClr 
	},
	textStyle:{
		color: Color.grayClg 
	},
	activeTabStyle:{
		backgroundColor: Color.appDefultColor
	},
	activeTextStyle:{
		color: Color.whiteClr ,
		fontWeight: "normal"
	}
};
