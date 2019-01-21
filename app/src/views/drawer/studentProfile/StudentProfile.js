import React from "react";
import { View, Image } from "react-native";
import { Container, Content, InputGroup, Input } from "native-base";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Styles from "./Styles";
import Images from "../../../common/images";
import GlobalStyle from "../../../common/GlobalStyle";
import { updateUserData } from "../../../actions";
import {
  SpinnerLoad,
  ButtonComponent,
  InputComponent
} from "../../../components";
import Header from "../../../components/header/header";

class StudentProfileComponent extends React.Component {
  static defaultProps = {
    SpinnerVisible: true
  };
  constructor(props) {
    super(props);
    const { userData } = this.props;
    this.state = {
      //user_id: userData._id,
      name: userData.name,
      email: userData.email,
      profilePic: userData.profilePic,
      age: userData.age,
      country:
        userData.country != null || userData.country != undefined
          ? userData.country
          : "",
      streetAddress:
        userData.streetAddress != null || userData.streetAddress != undefined
          ? userData.streetAddress
          : "",
      state:
        userData.state != null || userData.state != undefined
          ? userData.state
          : "",
      city:
        userData.city != null || userData.city != undefined
          ? userData.city
          : "",
      zipcode:
        (userData.zipCode != null || userData.zipCode != undefined) &&
        userData.zipCode > 0
          ? userData.zipCode
          : ""
    };
  }

  back = () => {
    Actions.pop();
  };

  render() {
    const {
      showDefault,
      profilePic,
      name,
      email,
      streetAddress,
      state,
      city,
      zipcode,
      country,
      age
    } = this.state;
    const { SpinnerVisible } = this.props;
    var icon = showDefault ? Images.user : profilePic;
    return (
      <Container>
        <Header title="Student Profile" />
        <Content>
          <SpinnerLoad spinnerVisible={SpinnerVisible} />

          <View style={[GlobalStyle.container, GlobalStyle.viewCenter]}>
            <View style={Styles.profilePicView}>
              <View style={GlobalStyle.row}>
                <Image source={icon} style={Styles.profilePic} />
              </View>
            </View>
            <InputGroup borderType="underline" style={GlobalStyle.width60}>
              <Input
                style={Styles.nameText}
                placeholder="Enter Name"
                onChangeText={name => this.setState({ name: name })}
                value={name}
                disabled
              />
            </InputGroup>
          </View>
          <View style={{ padding: 20 }}>
            <InputComponent
              title="Email"
              icon={Images.premiumImg}
              iconStyle={Styles.icon}
              placeholder="Email"
              multiline
              value={email}
              setValues={text => this.setState({ email: text })}
              fieldWidth={{ width: "100%" }}
              height={90}
              maxLength={200}
              keyboardType="email-address"
              fieldDisable
            />

            <InputComponent
              title="Address"
              icon={Images.locationImg}
              iconStyle={Styles.icon}
              placeholder="Street Address"
              multiline
              value={streetAddress + " " + city + " " + state + " " + zipcode}
              setValues={text => this.setState({ streetAddress: text })}
              fieldWidth={{ width: "100%" }}
              height={70}
              maxLength={100}
              keyboardType="numbers-and-punctuation"
              fieldDisable
            />

            <InputComponent
              title="Location"
              icon={Images.locationImg}
              iconStyle={Styles.icon}
              placeholder="State"
              multiline={false}
              value={state + ", " + country}
              setValues={text => this.setState({ state: text })}
              fieldWidth={{ width: "100%" }}
              height={70}
              maxLength={100}
              keyboardType="numbers-and-punctuation"
              fieldDisable
            />

            <InputComponent
              title="Age"
              icon={Images.schoolImg}
              iconStyle={Styles.icon}
              placeholder="Age"
              multiline={false}
              value={age == true ? "Above 18" : "Below 18"}
              setValues={text => this.setState({ age: text })}
              fieldWidth={{ width: "100%" }}
              height={70}
              maxLength={100}
              keyboardType="numeric"
              fieldDisable
            />

            <View style={Styles.btnView}>
              <ButtonComponent
                btnText="Back"
                btnStyle={Styles.btn}
                callFunction={() => this.back()}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

//export default StudentProfileComponent;
const maptoprops = state => {
  console.log("student state", state);
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata,
    token: state.User.userdata.api_token
      ? state.User.userdata.api_token
      : state.User.userdata.token
  };
};

StudentProfileComponent.propTypes = {
  SpinnerVisible: PropTypes.bool,
  userData: PropTypes.element.isRequired
};

export default connect(
  maptoprops,
  { updateUserData }
)(StudentProfileComponent);
