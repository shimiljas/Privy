import RF from "react-native-responsive-fontsize";
import Color from "../../common/Color";
import Util from "../../common/Util";

export default {
    profilePic: { width: Util.getWidth(15), height: Util.getWidth(15), borderRadius: Util.getWidth(15) },

    titleView: {
		// position: "absolute",
		// //top: 10,
        // left: "40%",
        paddingLeft: 5
	},

    imageView: { position: "absolute", top: 10, right: 10 },

    replyView: {
        position: "absolute",
        justifyContent: 'center',
		//top: 10,
		marginLeft: Util.getWidth(15),
    },

    title: {
        fontSize: RF(3),
        fontFamily: "Poppins-Medium",
        color: Color.darkGray
    },

    time: {
        fontSize: RF(2),
        fontFamily: "Poppins",
        color: Color.grayClg
    },
    message: {
        fontSize: RF(2.5),
        color: Color.darkGray,
        fontFamily: "Poppins",
        padding: Util.getWidth(4),
    },
    reply: {
        fontSize: RF(2.5),
        fontFamily: "Poppins",
        color: Color.grayClg
    },
    marginTop: {
        marginTop: 10,
    },
    cardView: {
        flex:1
        // height: Util.getHeight(55)
    },
    cardItemView: { padding:1 },
    leftRightMargin: { marginLeft: "5%", marginTop: "5%" },

};