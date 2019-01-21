import React from "react";
import { StatusBar, ImageBackground, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GlobalStyle from "../../common/GlobalStyle";
import Images from "../../common/images";
import { getUserInfo } from "../../actions";

class SplashComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { getUserInfo } = this.props;
    setTimeout(
      function() {
        AsyncStorage.getItem("userId").then(value => {
          if (value != "" && value != null) {
            var data = { user_id: value };
            AsyncStorage.getItem("apiToken").then(token => {
              console.log("apiToken", token);
              if (token != "" && token != null) {
                AsyncStorage.getItem("roleId").then(roleId => {
                  console.log("roleId", roleId);
                  if (roleId == "1") {
                    Actions.Login({ type: "replace" });
                  } else {
                    data.api_token = token;
                    getUserInfo(data);
                  }
                });
                console.log("token");
              } else {
                console.log("Logijn");
                Actions.Login({ type: "replace" });
              }
            });
          } else {
            Actions.Login({ type: "replace" });
          }
        });
      }.bind(this),
      3000
    );
  }

  render() {
    return (
      <ImageBackground
        resizeMode="stretch"
        source={Images.splashBg}
        style={GlobalStyle.container}
      >
        <StatusBar hidden />
      </ImageBackground>
    );
  }
}

SplashComponent.propTypes = {
  getUserInfo: PropTypes.func.isRequired
};

const maptoprops = state => {
  // if (state.User.userdata == "") Actions.Login();
  return {
    user: state.User.userdata
  };
};
export default connect(
  maptoprops,
  { getUserInfo }
)(SplashComponent);
