import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Container, Item, CheckBox, Content} from 'native-base';
import RF from 'react-native-responsive-fontsize';
//redux files
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {LoginUser, SignUser, SignUpUserSucsess} from '../../actions';
//common files
import Images from '../../common/images';
import GlobalStyle from '../../common/GlobalStyle';
import styles from './Styles';
import KeyString from '../../common/Localization';
import Util from '../../common/Util';
import Color from '../../common/Color';
import {RoundInput, SpinnerLoad, ModelAlert} from '../../components';

class Login extends Component {
  constructor () {
    super ();
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      confirmPasswordError: '',
      signin: true,
      signup: false,
      agreeToTerm: false,
      agreeToTermError: '',
    };
  }
  componentWillReceiveProps () {
    // if (this.props.SuccessData == true) {
    //   this.clearFields(1);
    // }
  }

  clearFields = data => {
    const {SignUpUserSucsess} = this.props;
    if (data == 1) {
      this.setState ({signin: true, signup: false});
    } else this.setState ({signin: false, signup: true});
    SignUpUserSucsess ();

    this.setState ({
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerm: false,
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      agreeToTermError: '',
    });
  };

  _modelShow = () => {
    const {selectedData} = this.state;
    const {SuccessData} = this.props;
    console.log ('item details', selectedData);
    return (
      <ModelAlert
        successData={SuccessData}
        modelStyle={styles.formView}
        onClose={() => {
          this.setModalVisible ();
        }}
      >
        <View style={[{width: '100%', padding: '2%', marginLeft: '3%'}]}>
          <Text
            style={{
              fontSize: RF (3),
              color: Color.black,
              height: '20%',
              fontFamily: 'Poppins-Regular',
            }}
          >
            Success
          </Text>
          <Text
            style={{
              fontSize: RF (2.2),
              marginTop: 10,
              marginHorizontal: '3%',
              fontFamily: 'Poppins-Regular',
            }}
          >
            {KeyString.sucessLogin}
          </Text>
        </View>
        <View style={[GlobalStyle.viewCenter, {height: '30%', width: '100%'}]}>
          <Item
            rounded
            style={[
              styles.btn,
              {width: '80%', marginTop: 0, marginBottom: 0},
              GlobalStyle.viewCenter,
            ]}
            onPress={() => this.clearFields (1)}
          >
            <Text style={[styles.btnText, {fontFamily: 'Poppins-Regular'}]}>
              Ok
            </Text>
          </Item>
        </View>
      </ModelAlert>
    );
  };
  _commonForm = () => {
    const {email, emailError, password, passwordError} = this.state;
    return (
      <View style={GlobalStyle.viewCenter}>
        <RoundInput
          placeValue={KeyString.email}
          type="email-address"
          changeValue={email => {
            this.setState ({
              emailError: '',
            });
            this.validateEmail (email);
          }}
          inputValue={email}
          iconName="ios-person"
        />
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{emailError}</Text>
        </View>

        <RoundInput
          placeValue={KeyString.password}
          changeValue={password => {
            this.setState ({
              password: password,
              passwordError: '',
            });
          }}
          inputValue={password}
          iconName="ios-lock"
          secure={true}
        />
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{passwordError}</Text>
        </View>
      </View>
    );
  };
  registration () {
    const {email, confirmPassword, password, agreeToTerm} = this.state;
    const {SignUpUserSucsess, SignUser} = this.props;
    SignUpUserSucsess ();
    if (email == '') {
      this.setState ({emailError: KeyString.emailMsg});
    } else if (!this.validateEmail (email)) {
    } else if (!this.validatePassword (password)) {
    } else if (confirmPassword == '') {
      this.setState ({passwordError: ''});
      this.setState ({
        confirmPasswordError: KeyString.confirmPassReq,
      });
    } else if (password != confirmPassword) {
      this.setState ({passwordError: ''});
      this.setState ({
        confirmPasswordError: KeyString.confirmPassMatch,
      });
    } else if (agreeToTerm == false) {
      this.setState ({confirmPasswordError: ''});
      this.setState ({
        agreeToTermError: KeyString.selectTermMsg,
      });
    } else {
      var obj = {
        email: email,
        password: password,
      };
      SignUser (obj);
    }
  }
  validatePassword () {
    const {password} = this.state;
    if (password == '') {
      this.setState ({emailError: ''});
      this.setState ({passwordError: KeyString.passMeg});
      return false;
    } else if (password.length < 6) {
      this.setState ({emailError: ''});
      this.setState ({passwordError: KeyString.passShortMsg});
      return false;
    } else if (password.length > 20) {
      this.setState ({emailError: ''});
      this.setState ({passwordError: KeyString.passLongMsg});
      return false;
    } else {
      return true;
    }
  }
  validateEmail (email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.setState ({email: email});
    if (email == '') {
      this.setState ({emailError: KeyString.emailMsg});
      return false;
    } else if (reg.test (email) === false) {
      this.setState ({emailError: KeyString.validEmail});
      return false;
    } else {
      return true;
    }
  }
  login () {
    const {email, password} = this.state;
    const {LoginUser} = this.props;
    if (email == '') {
      this.setState ({emailError: KeyString.emailMsg});
    } else if (!this.validateEmail (email)) {
      this.setState ({emailError: KeyString.validEmail});
    } else if (!this.validatePassword (password)) {
      console.log ('password is not valid');
    } else {
      const data = {
        email: email,
        password: password,
      };
      LoginUser (data);
    }
  }
  signFrom () {
    return (
      <View>
        <View style={styles.wrapper}>
          <ImageBackground
            source={Images.leftBoxBg}
            resizeMode="stretch"
            style={[styles.loginBgImg, GlobalStyle.viewCenter]}
          >
            <View style={[styles.loginBg, GlobalStyle.viewCenter]}>
              {this._commonForm ()}
              <Item
                rounded
                style={[styles.btn, GlobalStyle.viewCenter]}
                onPress={() => this.login ()}
              >
                <Text style={styles.btnText}>{KeyString.signInBtn}</Text>
              </Item>
            </View>
          </ImageBackground>
        </View>
        <View style={GlobalStyle.viewCenter}>
          <View
            style={{
              marginTop: -Util.getWidth (4),
              width: Util.getWidth (75),
            }}
          >
            {/*
            <TouchableOpacity
              style={{}}
              onPress={() => {
                Actions.Password ();
              }}
            >
              <Text
                style={{
                  fontSize: RF (2),
                  alignSelf: 'flex-end',
                }}
              >
                {KeyString.resetPassword}
              </Text>
            </TouchableOpacity>
              */}
          </View>
        </View>
      </View>
    );
  }
  loginForm () {
    const {
      confirmPassword,
      confirmPasswordError,
      agreeToTerm,
      agreeToTermError,
    } = this.state;
    return (
      <View>
        <View style={styles.wrapper}>
          <ImageBackground
            source={Images.rightBoxBg}
            resizeMode="stretch"
            style={[styles.signBgImg, GlobalStyle.viewCenter]}
          >
            <View style={[styles.signBg, GlobalStyle.viewCenter]}>
              {this._commonForm ()}

              <RoundInput
                placeValue={KeyString.confirmPassword}
                changeValue={confirmPassword =>
                  this.setState ({
                    confirmPassword,
                    confirmPasswordError: '',
                  })}
                inputValue={confirmPassword}
                iconName="ios-lock"
                secure={true}
              />
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
              <View style={[styles.row, styles.width75, {marginTop: '1.5%'}]}>
                <View
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CheckBox
                    checked={agreeToTerm}
                    color="#aeb5bc"
                    checkboxBgColor="#0b5604"
                    onPress={() =>
                      this.setState ({
                        agreeToTerm: !agreeToTerm,
                        agreeToTermError: '',
                      })}
                    style={styles.btnPadding}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    width: '80%',
                    height: 30,
                    justifyContent: 'center',
                    marginLeft: Util.getWidth (2),
                  }}
                  onPress={() => Actions.Terms ()}
                >
                  <Text style={styles.agreeText}>Agree to terms?</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.errorText}>{agreeToTermError}</Text>
              <Item
                rounded
                style={[styles.btn, GlobalStyle.viewCenter]}
                onPress={() => this.registration ()}
              >
                <Text style={styles.btnText}>Sign Up</Text>
              </Item>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
  render () {
    const {signin, signup} = this.state;

    const {SpinnerVisible} = this.props;
    return (
      <Container>
        <ImageBackground
          source={Images.loginBg}
          resizeMode="stretch"
          style={{flex: 1}}
        >
          <Content contentContainerStyle={{flex: 1}}>
            <SpinnerLoad spinnerVisible={SpinnerVisible} />
            {this._modelShow ()}
            <Image
              resizeMode="contain"
              source={Images.logo}
              style={styles.logoImage}
            />
            <View style={[styles.titleLable, GlobalStyle.viewCenter]}>
              <TouchableOpacity
                style={[styles.tabText, GlobalStyle.viewCenter]}
                onPress={() => {
                  this.clearFields (1);
                }}
              >
                <Text
                  style={[
                    styles.lable,
                    signin ? styles.blackColor : styles.greyColor,
                  ]}
                >
                  Sign in
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabText, GlobalStyle.viewCenter]}
                onPress={() => {
                  this.clearFields (2);
                }}
              >
                <Text
                  style={[
                    styles.lable,
                    signup ? styles.blackColor : styles.greyColor,
                  ]}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              {signin ? this.signFrom () : this.loginForm ()}
            </ScrollView>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

const maptoprops = state => {
  console.log ('login state', state.User.successData);
  return {
    user: state.User.userdata,
    SpinnerVisible: state.Loader.visible,
    SuccessData: state.User.successData,
  };
};

export default connect (maptoprops, {LoginUser, SignUser, SignUpUserSucsess}) (
  Login
);
