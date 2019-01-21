import RF from "react-native-responsive-fontsize";
import Color from "../../../common/Color";
import Util from "../../../common/Util";

export default {
    tabUnderline: {
		borderBottomColor: "white",
		borderBottomWidth: 5,
	},
    tab: {
            backgroundColor: Color.tabsColor,
        },
    activeTab: {
            backgroundColor: Color.appDefultColor,
        },
    headerTitle: {
            fontSize: RF(3.5),
            color: Color.grayClg,
            padding: '5%',
            fontWeight: 'bold'
        },   
    tabText: {
            color: Color.grayClg
        },
    title: { fontSize: RF(3), color: Color.darkGray, fontWeight: "bold"},
    
    menuIcon: { width: "12%", alignItems: "flex-end" },
        
        margin15: { margin: Util.getWidth(5) },
    
        flexGrow: { flexGrow: 1 },
    
        mainTitleView: { width: "75%", justifyContent: "center" },

        btn: {
            marginTop: Util.getHeight(3),
            marginBottom: Util.getHeight(5),
			padding: 15,
			backgroundColor: Color.appDefultColor,
			borderRadius: 50,
			width: "100%",
			alignItems: "center",
			justifyContent: "center"
        },
        
        orText: {
            //alignSelf: 'center',
            fontSize: RF(3),
            color: Color.grayClg,
            fontWeight: 'bold',
            marginTop: 15,
            //marginLeft: Util.getWidth(15)
        },

    lable: {
			fontSize: RF(2.3),
			color: Color.grayClg,
	
			//marginLeft: Util.getWidth(15)
        },
        
    icon: { height: Util.getWidth(5), width: Util.getWidth(4) },

    icon1: { height: Util.getWidth(4), width: Util.getWidth(5) },

    sameIcon: { height: Util.getWidth(5), width: Util.getWidth(5) },

    addIcon: { height: Util.getWidth(8), width: Util.getWidth(8)},

    width100p: {
        width: '100%'
    },
    imageBck:{
        height: Util.getWidth(13), 
        width: Util.getWidth(13)
    },
    width10p: {
        width: '10%'
    },

    width90p: {
        width: '90%'
    },

    dividerStyle: {marginLeft: '10%', width: '90%'}, 

    marginBottom5p: {marginBottom: '5%'},

    headerView: { marginLeft:Util.getWidth(5),
        marginTop:'5%',
        marginRight:Util.getWidth(5)}, 
    headerTitleView: {flex:1, justifyContent:'center'},
    marginBottom1p: {marginBottom: '1%'},
    menuProvider: {backdrop: {
        backgroundColor: "#000",
        opacity: 0.6
      }}
    
};
