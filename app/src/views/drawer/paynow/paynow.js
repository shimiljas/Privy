import React from "react";

import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { Container, Content, InputGroup, Input, Item } from "native-base";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BTClient from "react-native-braintree-xplat";
import { Actions } from "react-native-router-flux";
import Styles from "./Styles";
import Images from "../../../common/images";
import {
  updateUserData,
  LoaderStatusOn,
  LoaderStatusOff,
  PaypalToken,
  PayForBooking
} from "../../../actions";
import Color from "../../../common/Color";
import GlobalStyle from "../../../common/GlobalStyle";
import { SpinnerLoad, ButtonComponent, ModelAlert } from "../../../components";
import Header from "../../../components/header/header";
import KeyWords from "../../../common/Localization";

class PayNowComponent extends React.Component {
  static defaultProps = {
    SpinnerVisible: false,
    bookingStatus: false,
  };

  constructor(props) {
    super(props);
    this.state = { successData: false };
  }
  componentWillReceiveProps(nextProps) {
    console.log("new props===",nextProps);
    if(nextProps.bookingStatus){
      this.setState({ successData: true });
    }   
  }
  // componentDidMount = () => {
  //   const {PaypalToken1}  =this.props;

  // };
  pay = () => {
    alert('In progress...')
    // this.setState({ successData: true });
  };

  modelBtn = () => {
    this.setState({ successData: false });
    Actions.DashboardScreen({ type: "replace" });
  };
  payPalCall = async () => {
    const {
      LoaderStatusOn,
      LoaderStatusOff,
      userData,
      SelectedUser,
      BookingId,
      PayForBooking,
      PaypalToken1
    } = this.props;
    if (Platform.OS === "ios") {
      BTClient.setupWithURLScheme(
        PaypalToken1,
        "org.reactjs.native.example.PrivyApp.payments"
      );
    } else {
      BTClient.setup(PaypalToken1);
    }
    await LoaderStatusOn();
    BTClient.showPayPalViewController()
      .then(async nonce => {
        await LoaderStatusOff();
        await PayForBooking({
          api_token:
            userData.api_token != null ? userData.api_token : userData.token,
          user_id: userData._id,
          amount: SelectedUser.price + 1,
          booking_id: BookingId,
          paymentMethodNonce: nonce
        });
        console.log("showPayPalViewController Success", nonce);
        // alert("success" + nonce);
      })
      .catch(async err => {
        await LoaderStatusOff();
        console.log("showPayPalViewController err", err);
        // alert("fail" + err);
      });
  };

  _modelShow = () => {
    const { selectedData, successData } = this.state;
    console.log("item details", selectedData);
    return (
      <ModelAlert
        successData={successData}
        modelStyle={Styles.formView}
        onClose={() => {
          this.setModalVisible();
        }}
      >
        <View style={Styles.modelTextView}>
          <Text style={Styles.modelSuccess}>{KeyWords.successs}</Text>
          <View style={Styles.modelText}>
            <Image
              source={Images.paySuccessImg}
              resizeMode="contain"
              style={Styles.imageStyle}
            />
            <Text style={Styles.successMessage}>
              {KeyWords.bookingSuccessMsg}
            </Text>
          </View>
        </View>
        <View style={[GlobalStyle.viewCenter, Styles.modelBtnView]}>
          <Item
            rounded
            style={[Styles.modelBtn, GlobalStyle.viewCenter]}
            onPress={() => this.modelBtn()}
          >
            <Text style={Styles.btnText}>{KeyWords.ok}</Text>
          </Item>
        </View>
      </ModelAlert>
    );
  };

  render() {
    const { SpinnerVisible, SelectedUser } = this.props;
    return (
      <Container>
        <Header title={KeyWords.pay} />
        <Content padder style={{ backgroundColor: Color.tabsColor }}>
          <SpinnerLoad spinnerVisible={SpinnerVisible} />
          {this._modelShow()}
          <View style={Styles.margin5}>
            <View style={Styles.marginBottom3}>
              <Text style={Styles.title}>{KeyWords.pay}</Text>
            </View>
            <View style={GlobalStyle.fullDivider} />
            <View style={[GlobalStyle.row, Styles.amountView]}>
              <View style={Styles.amountTextView}>
                <Text style={[Styles.amtLable, GlobalStyle.alignSelfStart]}>
                  {KeyWords.amount}
                </Text>
              </View>
              <View style={Styles.widthU15}>
                <Text style={[Styles.amtLable, GlobalStyle.alignSelfEnd]}>
                  {" "}
                  $
                  {SelectedUser.price == undefined ? 0 : SelectedUser.price + 1}
                </Text>
              </View>
            </View>
            <View style={GlobalStyle.fullDivider} />
            <View style={GlobalStyle.viewCenter}>
              <TouchableOpacity
                onPress={() => this.payPalCall()}
                style={[GlobalStyle.row, Styles.paypalExpressBtnView]}
              >
                <View
                  style={[
                    GlobalStyle.justifyContentCenter,
                    GlobalStyle.width50p
                  ]}
                >
                  <Image
                    source={Images.paypalBtnImg}
                    style={GlobalStyle.alignSelfStart}
                  />
                </View>
                <View
                  style={[
                    GlobalStyle.justifyContentCenter,
                    GlobalStyle.width40p
                  ]}
                >
                  <Text style={Styles.payBtnText}>
                    {KeyWords.expressCheckout}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[GlobalStyle.viewCenter, GlobalStyle.height10]}>
              <Text style={Styles.orText}>{KeyWords.or}</Text>
            </View>
            <View style={Styles.cardFieldsView}>
              <View style={Styles.marginBottom}>
                <Text style={Styles.lable}>{KeyWords.cardHolderName}</Text>
                <InputGroup borderType="underline">
                  <Input placeholder={KeyWords.name} />
                </InputGroup>
              </View>

              <View style={Styles.marginBottom}>
                <Text style={Styles.lable}>{KeyWords.cardNumber}</Text>
                <InputGroup borderType="underline">
                  <Input placeholder="1234 5678 9012" />
                </InputGroup>
              </View>

              <View style={[GlobalStyle.row, Styles.marginBottom]}>
                <View style={Styles.cardExpiryMMView}>
                  <Text style={Styles.lable}>{KeyWords.expiry}</Text>
                  <InputGroup borderType="underline">
                    <Input placeholder="MM" />
                  </InputGroup>
                </View>
                <View style={GlobalStyle.width25p}>
                  <Text style={Styles.lable} />
                  <InputGroup borderType="underline">
                    <Input placeholder="YY" />
                  </InputGroup>
                </View>
              </View>

              <View style={Styles.marginBottom}>
                <Text style={Styles.lable}>{KeyWords.cvv}</Text>
                <InputGroup borderType="underline">
                  <Input placeholder="0000" />
                </InputGroup>
              </View>
            </View>

            <View style={GlobalStyle.fullDivider} />

            <View
              style={[GlobalStyle.row, GlobalStyle.viewCenter, Styles.btnView]}
            >
              <ButtonComponent
                btnText={KeyWords.pay}
                btnStyle={Styles.btn}
                callFunction={() => this.pay()}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

PayNowComponent.propTypes = {
  SpinnerVisible: PropTypes.bool,
  bookingStatus: PropTypes.bool

};

const maptoprops = state => {
  console.log("Booking Id...", state.Payment);
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata,
    SelectedUser: state.SearchIntructor.selectedUser,
    PaypalToken1: state.Payment.Paypaltoken,
    BookingId: state.Payment.bookingId,
    bookingStatus: state.Payment.bookingStatus

  };
};

export default connect(
  maptoprops,
  {
    updateUserData,
    LoaderStatusOn,
    LoaderStatusOff,
    PaypalToken,
    PayForBooking
  }
)(PayNowComponent);
