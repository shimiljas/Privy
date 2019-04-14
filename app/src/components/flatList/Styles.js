import Util from "../../common/Util";
import RF from "react-native-responsive-fontsize";
import Color from "../../common/Color";

export default {
        topRightBtn: {
            backgroundColor: Color.appDefultColor
        },

        title: {
            fontSize: RF(2), 
            //fontWeight: 'bold',
            color: Color.grayClg
        },

        btnPadding: {
            //marginTop: Util.getHeight(10),
            borderRadius: Util.getWidth(50),
            marginRight: Util.getWidth(5),
        },

        marginright: {
            paddingRight: '7%'
        },
        
        imagesView: { width: "95%" }, 

        flexGrow: {flexGrow: 1,  paddingRight:'28%', paddingLeft: '5%'},

        text: { fontSize: RF(2)},
        marginTop2p: {marginTop: '2%'},
        imagesStyle: { width: Util.getWidth(12), height: Util.getWidth(12) },
    
};