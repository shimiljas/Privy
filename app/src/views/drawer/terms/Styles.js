import Util from "../../../common/Util";
import RF from "react-native-responsive-fontsize";
import Color from "../../../common/Color";
import GlobalStyle from "../../../common/GlobalStyle";
export default {
	closeBtn: {
		width: Util.getWidth(12),
		height: Util.getWidth(12)
    },
    textStyles:{
        fontSize:RF(3.2),
        color:Color.grayClg,
        fontWeight:'900'
    },
    btn: {
        padding: 15,
        backgroundColor: Color.appDefultColor,
        borderRadius: 50,
        width: "80%",

    },
};
