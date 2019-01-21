import React from "react";
import { View, Text, Image, Alert } from "react-native";
import {
  Container,
  Content,
  InputGroup,
  Input,
  Item,
  CheckBox,
  Card
} from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Styles from "./Styles";
import Images from "../../../common/images";
import { updateUserData } from "../../../actions";
import GlobalStyle from "../../../common/GlobalStyle";
import ClientApi from "../../../common/ApiManager";
import Color from "../../../common/Color";
import KeyWords from "../../../common/Localization";

import {  CardComponentAcc } from "../../../components";
import  Header  from "../../../components/header/header";

var text1 = KeyWords.perBookedAppointment;
var text2 = KeyWords.perBookedUnlimited;

var selectedPlanText1 = KeyWords.select + " " + KeyWords.plan;

var selectedPlanText2 = KeyWords.switchPlan1;

var selectedPlanText3 = KeyWords.switchPlan2;

class MyAccountComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentPlan: "",
      paypalId: "",
      autoWithdraw: false,
      pendingAmount: "",
      withdrawAmount: ""
    };

    this.getAccountDetails();
  }

  getAccountDetails = async () => {
    const { userData } = this.props;
    var obj = { user_id: userData._id };

    var response = await ClientApi.callApi(
      "getInstructorAccount",
      obj,
      userData.token
    );
    console.log("instructor account response == ", response);

    if (response.status == "true") {
      this.setState({
        paypalId: response.data.paypalId,
        autoWithdraw: response.data.autoWithdraw,
        pendingAmount: response.data.pendingAmount,
        withdrawAmount: response.data.withdrawAmount
      });
      console.log("acc details === ", this.state);
    }
  };

  update = plan => {
    const { userData, updateUserData } = this.props;
    if (plan != userData.paymentPlan) {
      var obj = {
        user_id: userData._id,
        paymentPlan: plan
      };
      console.log("selected plan - " + plan);
      Alert.alert(
        KeyWords.alert,
        KeyWords.doYouWantToSelectThisPlan,
        [
          {
            text: KeyWords.cancel,
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: KeyWords.ok,
            onPress: () => {

              if (plan == 1) {
              this.setState({ paymentPlan: plan });
              // this.callApi('updateInstructorProfile', obj);
              var data = {
                methodName: "updateInstructorProfile",
                data: obj,
                token:
                  userData.api_token != null
                    ? userData.api_token
                    : userData.token
              };
              console.log("before calling api", userData, data);
            
             updateUserData(data);
            }
            }
          }
        ],
        { cancelable: true, text: "Can" }
      );
    } else {
      alert(KeyWords.planAlreadySelected);
    }

    if (plan == 2) {
      Actions.Pay({ type: "replace" });
    }
  };

  withdrawAmount = () => {
    const { amount, withdrawAmount } = this.state;
    if (amount <= 0) {
      alert(KeyWords.amtGrtThn0Msg);
    } else if (amount > withdrawAmount) {
      alert(KeyWords.amtntGrtCrrBal);
    } else {
      alert("Will be implemented later");
    }
  };

  savePaymentDetails = async () => {
    const { paypalId, autoWithdraw } = this.state;
    const { userData } = this.props;
    if (paypalId == "") {
      alert(KeyWords.enter + " " + KeyWords.paypalId);
    } else {
      var obj = {
        user_id: userData._id,
        paypalId: paypalId,
        autoWithdraw: autoWithdraw
      };
      //this.callApi('updateInstructorAccount', obj);
      var response = await ClientApi.callApi(
        "updateInstructorAccount",
        obj,
        userData.token
      );
      console.log("api response == ", response);
      if (response.status == "true") {
        Alert.alert(
          KeyWords.successs,
          KeyWords.paymentSettingUpdateMsg,
          [
            {
              text: KeyWords.ok,
              onPress: () => {
                this.setState({
                  autoWithdraw: response.data.autoWithdraw,
                  pendingAmount: response.data.pendingAmount,
                  withdrawAmount: response.data.withdrawAmount
                });
              }
            }
          ],
          { cancelable: false }
        );
      }
    }
  };

  render() {
    const { userData } = this.props;
    const { paymentPlan, autoWithdraw, paypalId, withdrawAmount, amount } = this.state;
    return (
      <Container>
        <Header title={KeyWords.myAccount} />
        <Content>
          <View style={GlobalStyle.fullHeight}>
            <View style={[GlobalStyle.height50]}>
              <View style={Styles.titleView}>
                <Text style={Styles.lableText}>{KeyWords.choosePlan}</Text>
              </View>
              <View style={[Styles.row]}>
                <CardComponentAcc
                  title={text1}
                  image={Images.calendarImg}
                  price={KeyWords.plan1Price}
                  style={[Styles.marginLeft5, Styles.planCard]}
                  callUpdate={() => this.update(1)}
                  selected={
                    userData.paymentPlan == 1
                      ? Color.appDefultColor
                      : Color.grayClg
                  }
                  btnText={
                    userData.paymentPlan == 1
                      ? KeyWords.selected
                      : KeyWords.select
                  }
                />

                <CardComponentAcc
                  title={text2}
                  image={Images.starImg}
                  price={KeyWords.plan2Price}
                  style={[Styles.planCard]}
                  callUpdate={() => this.update(2)}
                  selected={
                    userData.paymentPlan == 2
                      ? Color.appDefultColor
                      : Color.grayClg
                  }
                  btnText={
                    userData.paymentPlan == 2
                      ? KeyWords.selected
                      : KeyWords.select
                  }
                />
              </View>
              <View style={[GlobalStyle.height10, Styles.planText]}>
                <Text style={Styles.fontSize16}>
                  {userData.paymentPlan == 2 || paymentPlan == 2
                    ? selectedPlanText2
                    : userData.paymentPlan == 1 || paymentPlan == 1
                    ? selectedPlanText3
                    : selectedPlanText1}
                </Text>
              </View>
            </View>
            <View style={[Styles.seperator]} />
            <View style={[GlobalStyle.height50, Styles.secondView]}>
              <View style={[GlobalStyle.height10, Styles.marginTop12]}>
                <Text style={Styles.lableText}>
                  {KeyWords.payment + " " + KeyWords.details}
                </Text>
              </View>
              <Card style={[Styles.padding, GlobalStyle.height40]}>
                <View style={[Styles.paymentCard, GlobalStyle.height20]}>
                  <View style={Styles.paypalImgView}>
                    <Image source={Images.paypalImg} />
                  </View>
                  <View style={Styles.paypalAutoWithdrawalView}>
                    <Text>{KeyWords.auto + " " + KeyWords.withdraw}</Text>
                    <CheckBox
                      checked={autoWithdraw}
                      color={Color.grayClg}
                      checkboxBgColor={Color.appDefultColor}
                      onPress={() =>
                        this.setState({
                          autoWithdraw: !autoWithdraw
                        })
                      }
                      style={Styles.checkbox}
                    />
                  </View>
                </View>
                <View style={GlobalStyle.height45}>
                  <InputGroup
                    borderType="underline"
                    style={GlobalStyle.width60}
                  >
                    <Input
                      placeholder={KeyWords.paypalIdLable}
                      onChangeText={paypalId =>
                        this.setState({ paypalId: paypalId })
                      }
                      value={paypalId}
                    />
                  </InputGroup>
                </View>
                <View style={Styles.cardBtnView}>
                  <Item
                    rounded
                    style={[Styles.smallbtn, Styles.grayColor]}
                    onPress={() => this.savePaymentDetails()}
                  >
                    <Text style={Styles.btnText}>{KeyWords.save}</Text>
                  </Item>
                </View>
              </Card>
              <Card
                style={[
                  Styles.padding,
                  GlobalStyle.height40,
                  Styles.marginTop3
                ]}
              >
                <View style={[Styles.row]}>
                  <Image source={Images.dollarImg} />
                  <Text style={Styles.withdrawAmount}>
                    <Text>$</Text>
                    {withdrawAmount}
                  </Text>
                </View>
                <View style={[Styles.row, Styles.marginBottom7]}>
                  <Text style={[Styles.fontSize18, Styles.withdrawText]}>
                    {KeyWords.amount}
                  </Text>
                  <InputGroup
                    borderType="underline"
                    style={GlobalStyle.width75}
                  >
                    <Input
                      placeholder="$0.00"
                      keyboardType="number-pad"
                      onChangeText={amount => this.setState({ amount: amount })}
                      value={amount}
                    />
                  </InputGroup>
                </View>

                <View style={Styles.cardBtnView}>
                  <Item
                    rounded
                    style={[Styles.smallbtn, Styles.grayColor]}
                    onPress={() => this.withdrawAmount()}
                  >
                    <Text style={Styles.btnText}>
                      {KeyWords.withdraw + " " + KeyWords.now}
                    </Text>
                  </Item>
                </View>
              </Card>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

MyAccountComponent.propTypes = {
	userData: PropTypes.element.isRequired,
	updateUserData: PropTypes.func.isRequired,
}

const maptoprops = state => {
  return {
    userData: state.User.userdata
  };
};

export default connect(
  maptoprops,
  { updateUserData }
)(MyAccountComponent);
