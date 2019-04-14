import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image
} from "react-native";
import { Container, Item, Content } from "native-base";
import RF from "react-native-responsive-fontsize";
//redux files
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Actions } from "react-native-router-flux";
import { ChangePasswordCall, ResetPasswordCall,PasswordModel } from "../../actions";
//common files
import Images from "../../common/images";
import GlobalStyle from "../../common/GlobalStyle";

import KeyString from "../../common/Localization";
import Util from "../../common/Util";

import { RoundInput, SpinnerLoad, ModelAlert } from "../../components";
import Styles from "./Styles";

class PasswordScreen extends Component {
  static defaultProps = {
    SpinnerVisible: false
  };
  constructor() {
    super();
    this.state = {
      email: "",
      otp: "",
      otpError: "",
      emailError: "",
      password: "",
      passwordError: "",
      confirmPassword: "",
      confirmPasswordError: "",
     // SuccessData: false,
      formChange: 0,
      // message:
      //   ""
    };
  }

  changePassword = async () => {
    const { confirmPassword, password, otp, email } = this.state;
    const { ResetPasswordCall } = this.props;
    if (otp == "") {
      this.setState({ otpError: "Please enter OTP" });
    } else if (!this.validatePassword(password)) {
      console.log();
    } else if (confirmPassword == "") {
      this.setState({ passwordError: "" });
      this.setState({
        confirmPasswordError: KeyString.confirmPassReq
      });
    } else if (password != confirmPassword) {
      this.setState({ passwordError: "" });
      this.setState({
        confirmPasswordError: KeyString.confirmPassMatch
      });
    } else {
      await ResetPasswordCall({ email: email, password: password, otp: otp });
      // this.setState({
      //   SuccessData: true,
      //   message: "Password Chnaged Successfully"
      // });
      return true;
    }
  };

  modelBtn = async() => {
    const {PasswordModel,Message} = this.props
    //this.setState({ SuccessData: false });
    if (Message == "Password reset successfully.") {
     await PasswordModel({page:'2'});
   //  Actions.pop();
    }
    else if(Message == "Thanks. A OTP verification email has been sent to address you mentioned."){
      await PasswordModel({page:'1'});
      this.setState({ formChange: 1});
    }
    else{
      await PasswordModel({page:'0'});
    }
  };

  _modelShow = () => {
    const { selectedData } = this.state;
    const {ModelVisible,Message} = this.props;
    console.log("item details", selectedData);
    return (
      <ModelAlert
        successData={ModelVisible}
        modelStyle={Styles.formView}
        onClose={() => {
          this.setModalVisible();
        }}
      >
        <View style={Styles.modelTextView}>
          <Text style={Styles.modelSuccess}>{KeyString.successs}</Text>
          <View style={Styles.line} />
          <View style={Styles.modelText}>
            <Text style={{ fontSize: RF(2.2), marginTop: 10 }}>{Message}</Text>
          </View>
        </View>
        <View style={[GlobalStyle.viewCenter, Styles.modelBtnView]}>
          <Item
            rounded
            style={[Styles.btn, Styles.modelBtn, GlobalStyle.viewCenter]}
            onPress={() => this.modelBtn()}
          >
            <Text style={Styles.btnText}>{KeyString.ok}</Text>
          </Item>
        </View>
      </ModelAlert>
    );
  };
  _emailForm = () => {
    const { email, emailError } = this.state;
    return (
      <View style={GlobalStyle.viewCenter}>
        <RoundInput
          placeValue={KeyString.email}
          type="email-address"
          changeValue={email => {
            this.setState({
              emailError: ""
            });
            this.validateEmail(email);
          }}
          inputValue={email}
          iconName="ios-person"
        />
        <View style={Styles.errorView}>
          <Text style={Styles.errorText}>{emailError}</Text>
        </View>
        <Item
          rounded
          style={[
            Styles.btn,
            GlobalStyle.viewCenter,
            { marginBottom: Util.getHeight(7) }
          ]}
          onPress={() => this.login()}
        >
          <Text style={Styles.btnText}>{KeyString.submit}</Text>
        </Item>
      </View>
    );
  };

  _otpForm = () => {
    const {
      otp,
      otpError,
      password,
      passwordError,
      confirmPassword,
      confirmPasswordError
    } = this.state;
    return (
      <View style={GlobalStyle.viewCenter}>
        <RoundInput
          placeValue="OTP"
          changeValue={otp => this.setState({ otp: otp, otpError: "" })}
          inputValue={otp}
          iconName="ios-lock"
        />
        <View style={Styles.errorView}>
          <Text style={Styles.errorText}>{otpError}</Text>
        </View>
        <RoundInput
          placeValue={KeyString.password}
          changeValue={password => {
            this.setState({
              password: password,
              passwordError: ""
            });
          }}
          inputValue={password}
          iconName="ios-lock"
          secure
        />
        <View style={Styles.errorView}>
          <Text style={Styles.errorText}>{passwordError}</Text>
        </View>
        <RoundInput
          placeValue={KeyString.confirmPassword}
          changeValue={confirmPassword =>
            this.setState({
              confirmPassword,
              confirmPasswordError: ""
            })
          }
          inputValue={confirmPassword}
          iconName="ios-lock"
          secure
        />
        <View style={Styles.errorView}>
          <Text style={Styles.errorText}>{confirmPasswordError}</Text>
        </View>

        <Item
          rounded
          style={[Styles.btn, GlobalStyle.viewCenter]}
          onPress={() => {
            this.changePassword();
          }}
        >
          <Text style={Styles.btnText}>Done</Text>
        </Item>
      </View>
    );
  };

  login = async () => {
    const { email } = this.state;
    const { ChangePasswordCall } = this.props;
    if (email == "") {
      this.setState({ emailError: KeyString.emailMsg });
    } else if (!this.validateEmail(email)) {
      console.log();
    } else {
      await ChangePasswordCall({ email: email });
     
    }
  };

  validateEmail(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState({ email: email });
    if (email == "") {
      this.setState({ emailError: KeyString.emailMsg });
      return false;
    } else if (reg.test(email) === false) {
      this.setState({ emailError: KeyString.validEmail });
      return false;
    } else {
      return true;
    }
  }

  validatePassword() {
    const { password } = this.state;
    if (password == "") {
      this.setState({ passwordError: KeyString.passMeg });
      return false;
    } else if (password.length < 6) {
      this.setState({ passwordError: KeyString.passShortMsg });
      return false;
    } else if (password.length > 20) {
      this.setState({ passwordError: KeyString.passLongMsg });
      return false;
    } else {
      return true;
    }
  }

  render() {
    const { SpinnerVisible } = this.props;
    const { formChange } = this.state;
    return (
      <Container>
        <ImageBackground
          source={Images.loginBg}
          resizeMode="stretch"
          style={{ flex: 1 }}
        >
          <SpinnerLoad spinnerVisible={SpinnerVisible} />

          {this._modelShow()}

          <Content contentContainerStyle={{ flex: 1 }}>
            <View style={Styles.closeImageView}>
              <TouchableOpacity
                style={Styles.closeImage}
                onPress={() => Actions.pop()}
              >
                <Image
                  resizeMode="contain"
                  source={Images.closeImg}
                  style={Styles.closeImage}
                />
              </TouchableOpacity>
            </View>
            <View elevation={5} style={Styles.containerBack}>
              <View style={Styles.pageTitle}>
                <Text style={Styles.title}>
                  {formChange == 0 ? "Reset Password" : "Change Password"}
                </Text>
              </View>

              <View style={{ marginTop: Util.getHeight(2) }}>
                {formChange == 0 ? this._emailForm() : this._otpForm()}
              </View>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

PasswordScreen.propTypes = {
  SpinnerVisible: PropTypes.bool
};

const maptoprops = state => {
  console.log("login state", state.User.successData);
  return {
    SpinnerVisible: state.Loader.visible,
    SuccessData: state.User.successData,
    ModelVisible: state.User.ModelVisible,
    Message: state.User.message
  };
};

export default connect(
  maptoprops,
  { ChangePasswordCall, ResetPasswordCall,PasswordModel }
)(PasswordScreen);
