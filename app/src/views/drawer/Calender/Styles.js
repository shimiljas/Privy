import RF from "react-native-responsive-fontsize";
import Util from "../../../common/Util";
import Color from "../../../common/Color";

export default {
  container: {
    flex: 1
  },
  calenderContainer: {
    width: Util.getWidth(100),
    height: Util.getHeight(50)
  },
  list: {
    justifyContent: "center",
    alignItems: "center"
  },
  backArea: {
    width: "95%",
    height: Util.getHeight(10),
    flexDirection: "row",
    alignSelf: "center"
  },
  calenderView:{
	height:Util.getHeight(50),
	width:'100%',
	// backgroundColor:'blue'
  },
  transparent: {
	position: 'absolute',
    height: '100%',
	width: "100%",
	
	backgroundColor:'transparent'
  },
  nameArea: {
    width: "70%",
    height: "100%",
    justifyContent: "center"
  },
  line: {
    width: "100%",
    height: 1,
    marginTop: "2%",
    backgroundColor: Color.grayClg
  },
  btnarea: {
    width: "25%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  back: {
    fontSize: RF(2.3)
  },
  nameText: {
    fontSize: RF(3),
    color: Color.darkGray
  }
};
