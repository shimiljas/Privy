import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image
} from "react-native";
import { connect } from "react-redux";
import { Item } from "native-base";
import { Actions } from "react-native-router-flux";
import Styles from "./Styles";
import ClientApi from "../../common/ApiManager";
import Util from "../../common/Util";
import Images from "../../common/images";
import { getUserInfo } from "../../actions";

class FirstLogin extends Component {
  constructor(props) {
    super(props);
    console.log("first log prop - ", this.props.userData);

    this.state = {
      userData: this.props.userData,
      type: ""
    };
  }

  componentWillReceiveProps = nextProps => {
    console.log("rec prop - ", nextProps);
  };

  _onPressButton = async () => {
    if (this.state.type == "") {
      alert("Please select type");
    } else {
      var roleId = 1;
      if (this.state.type == "i") {
        roleId = 3;
      } else {
        roleId = 2;
      }

      var token =
        this.props.userData.api_token != null
          ? this.props.userData.api_token
          : this.props.userData.token;

      var obj = {  user_id: await AsyncStorage.getItem("userId"), roleId: roleId };
      var response = await ClientApi.callApi("create_ut.php", obj, token);
      if (response.success == 1) {
        await AsyncStorage.setItem("roleId", String(roleId));
        Actions.drawer({
          type: "replace"
        });
        // this.props.getUserInfo(data);
      }
    }
  };
  render() {
	  const {type}=this.state;
    return (
      <View
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          width: Util.getWidth(100),
          height: Util.getHeight(100)
        }}
      >
        <TouchableOpacity
          style={[Styles.center]}
          onPress={() => this.setState({ type: "i" })}
        >
          <View
            style={[
              Styles.typeBorder,
              type == "i" ? Styles.activeType : ""
            ]}
          >
            {/* <View style={{height:'100%',width:'100%',justifyContent:'center',alignItems:'center'}}> */}
            <View style={Styles.textArea}>
              <Text style={Styles.typeSmallLable}> I am an </Text>
            </View>
            <View style={Styles.imageArea}>
              <Image
                resizeMode="contain"
                style={Styles.image}
                source={Images.instructorIcon}
              />
            </View>

            <View style={Styles.textArea}>
              <Text style={Styles.typeLable}>Instructor</Text>
            </View>

            {/* </View> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Styles.center]}
          onPress={() => this.setState({ type: "s" })}
        >
          <View
            style={[
              Styles.typeBorder,
              type == "s" ? Styles.activeType : ""
            ]}
          >
            <View style={Styles.textArea}>
              <Text style={Styles.typeSmallLable}> I am a </Text>
            </View>
            <View style={Styles.imageArea}>
              <Image
                resizeMode="contain"
                style={Styles.image}
                source={Images.studentIcon}
              />
            </View>

            <View style={Styles.textArea}>
              <Text style={Styles.typeLable}>Student</Text>
            </View>
         
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.center}>
          <Item
            rounded
            style={Styles.btn}
            onPress={() => this._onPressButton()}
          >
            <Text style={Styles.btnText}>Enter</Text>
          </Item>
        </TouchableOpacity>
      </View>
    );
  }
}

const maptoprops = state => {
  console.log("first log data", state);
  return {
    userData: state.User.userdata
  };
};

export default connect(
  maptoprops,
  { getUserInfo }
)(FirstLogin);
