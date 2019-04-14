import RF from "react-native-responsive-fontsize";
import Color from "../../../common/Color";
import Util from "../../../common/Util";


export default {
    advanceOptionTitle: {
        fontSize: RF(3),
        color: Color.grayClg,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    label: { fontSize: RF(2.3),
		color: Color.grayClg,
		marginTop: 15,
        marginLeft: "10%" },
        
    icon: { color: Color.grayClg, marginTop: "2%" },   
    
    iconStyle: {
        height: 18,
        width: 18
    },
    subcategory: {
        height: 24,
        width: 16
    },

    premium: {
        height: 27,
        width: 23
    },

    category: {
        height: 17,
        width: 22
    },

    calender: {
        height: 20,
        width: 20
    },

    circleIconStyle: {
        height: Util.getWidth(5), width: Util.getWidth(5)
    },

    tabUnderline: {
		borderBottomColor: "white",
		borderBottomWidth: 5,
	},
    tab: {
            backgroundColor: Color.tabsColor,
        },
    activeTab: {
            backgroundColor: "green",
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
        title: { fontSize: RF(3), color: Color.grayClg, fontWeight: "bold" },
    
        menuIcon: { width: "12%", alignItems: "flex-end" },
        
        margin15: { margin: 15 },
    
        flexGrow: { flexGrow: 1 },
    
        mainTitleView: { width: "75%", justifyContent: "center" },

        btn: {
            marginTop: 20,
            marginLeft: '10%',
			padding: 15,
			backgroundColor: Color.appDefultColor,
			borderRadius: 50,
			width: "80%",
			alignItems: "center",
			justifyContent: "center"
        },

        radioView: {width: '50%', alignItems: 'flex-start', justifyContent: 'center'},
        toText: {
            marginLeft: 15,
            marginTop: 5,
            fontSize: RF(2),
            marginRight: 15
          },
        timeStyle: { marginLeft: 10, marginTop: 5, fontSize: RF(2) },
        marginBottom3: { marginBottom: Util.getHeight(3) },  
        dividerStyle: { marginLeft: "10%", width: "80%" },
        height20: { height: Util.getHeight(20) },  
        advanceOptionTextView: { marginLeft: "10%", marginTop: Util.getHeight(2) },
        height100: { height: Util.getHeight(100) },
    
};
