import RF from "react-native-responsive-fontsize";
import Color from "../../../common/Color";
import Util from "../../../common/Util";
import GlobalStyle from "../../../common/GlobalStyle";

export default {
	title: {
		color: "#828282",
		fontSize: RF(2.5)
	},
	amtLable: {
		color: Color.darkGray,
		fontSize: RF(3),
		fontWeight: "bold",
		justifyContent: "center"
	},

	payBtnText: { alignSelf: "flex-end", color: "#004b84", fontSize: RF(2) },

	marginBottom: {
		marginBottom: Util.getHeight(2)
	},

	lable: {
		fontSize: RF(2),
		color: Color.grayClg
	},

	btn: {
		padding: 15,
		backgroundColor: Color.appDefultColor,
		borderRadius: 50,
		width: "40%",
		alignItems: "center",
		justifyContent: "center"
	},

	orText: { color: Color.darkGray, fontSize: RF(3), fontWeight: "bold" },

	formView: [
		GlobalStyle.viewCenter,
		{
			backgroundColor: "white",
			opacity: 1,
			borderRadius: 5,
			width: "80%",
			height: "40%"
		}
	],

	modelView: {
		position: "absolute",
		left: 50,
		height: "30%",
		padding: "5%"
	},

	modelBtn: {
		width: "40%",
		marginTop: 0,
        marginBottom: 0,
        padding:10,
        backgroundColor: Color.appDefultColor,
	},
	modelBtnView: {
		height: "15%",
		width: "100%"
	},
	line: {
		height: 1,
		width: "100%",
		backgroundColor: Color.grayClg
	},
	modelText: [
		GlobalStyle.viewCenter,
		{
			marginHorizontal: "5%",
			height: "60%"
		}
	],
	modelSuccess: {
		fontSize: RF(3),
		color: Color.grayClg,
		height: "20%",
		fontWeight: "900",
		marginLeft: "3%",
		marginBottom: "1%"
	},
	modelTextView: {
		height: "66%",
		width: "100%"
	},
	closeImageView: [
		GlobalStyle.viewCenter,
		{
			marginTop: Util.getHeight(5),
			height: Util.getHeight(15),
			width: Util.getWidth(90)
		}
    ],
    imageStyle: {
        width: Util.getWidth(15),
        height: Util.getWidth(15),
    },
    successMessage: {
        fontSize: RF(4),
		fontWeight: 'bold',
		marginTop: Util.getHeight(4),
    },
    btnText: {
		fontSize: RF(2.5),
		color: "white"
	},
	margin5: {margin: Util.getWidth(5)},
	marginBottom3: {marginBottom: Util.getWidth(3)},
	amountView: {justifyContent: 'center', marginTop: Util.getHeight(1), marginBottom: Util.getHeight(1)},
	amountTextView:{flex:1, justifyContent: 'center', width: Util.getWidth(65)},
	widthU15:{width: Util.getWidth(15)},
	paypalExpressBtnView: {width: Util.getWidth(70), height: Util.getHeight(7), backgroundColor: '#009bdf', borderRadius: Util.getHeight(10), marginTop: Util.getHeight(2), marginBottom: Util.getHeight(2), justifyContent: 'center'},
	cardFieldsView: {backgroundColor: Color.whiteClr, padding: Util.getWidth(7), marginBottom: Util.getHeight(5)},
	cardExpiryMMView: {width: '25%', marginRight: Util.getWidth(10)},
	btnView: {marginTop: Util.getHeight(4), marginBottom: Util.getHeight(4)},
};
