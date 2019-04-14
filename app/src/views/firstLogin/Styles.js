import Util from "../../common/Util";
import FS from 'react-native-responsive-fontsize';
export default {
  btn: {
    marginTop: Util.getWidth(7),
    backgroundColor: "#0B5604",
    width: Util.getWidth(60),
    height: Util.getHeight(7),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Util.getHeight(10)
  },
  btnText: {
    fontSize: FS(2),
    color: "white",
    fontWeight: "bold"
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  typeLable: {
    fontSize: FS(2.5),
    textAlign: "center",
    fontWeight: "bold",
    color: "#AEB5BC"
  },
  typeBorder: {
    alignItems: "center",
    justifyContent:'center',
    borderColor: "#EEEEEE",
    width: Util.getWidth(60),
    height: Util.getHeight(25),
    marginTop: Util.getHeight(5),
    borderWidth: 5,
    borderRadius: 25,
    shadowColor: "#F5F5F5"
  },
  imageArea:{
    height:'60%',
    justifyContent:'center',
    alignItems:'center'
  },
  textArea:{
    height:'15%',
 
    justifyContent:'center',
    alignItems:'center'
  },
  typeSmallLable: {
    fontSize: FS(2.5),
    color: "#41444B",
    fontWeight: "bold",
    marginBottom: Util.getHeight(1)
  },
  
  activeType: {
    borderColor: "#0B5604"
  },
  image:{
    height:Util.getHeight(10),
    width:Util.getWidth(30)
  }
};
