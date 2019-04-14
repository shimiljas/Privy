import React from "react";
import { View } from "react-native";
import { Container } from "native-base";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import Util from "../../../common/Util";
import Styles from "./Styles";
import GlobalStyle from "../../../common/GlobalStyle";
import Images from "../../../common/images";
import clientApi from "../../../common/ApiManager";

import {
  SpinnerLoad,
  ButtonComponent,
  InputComponent,
  CheckBoxComponent,
  PickerComponent
} from "../../../components";
import KeyWords from "../../../common/Localization";
import Header from "../../../components/header/header";

// temprary json response will remove it.
var classes = [
  {
    userId: {
      name: "",
      email: "ll@mailinator.com",
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      zipCode: 0,
      _id: "5bd714ef8a33fa1d1eb23175"
    },
    title: "hdfiohgof dhgoidfh ",
    description: "d dfgy9y dfyg9yfg",
    instructorProfileId: "5bd7153d8a33fa1d1eb23177",
    categoryId: {
      name: "Language",
      _id: "5bcdabd6d514912fb0e84aec"
    },
    subCategoryId: {
      name: "English",
      _id: "5bcdabfed514912fb0e84aed"
    },
    lessonType: 2,
    time: "13:00",
    end_time: "15:00",
    limit: 1,
    unlimited: false,
    price: 30,
    day: [],
    streetAddress: "ssd dsf dfs ds fdsf",
    city: "indore",
    state: "MP",
    country: "india",
    zipCode: 452001,
    _id: "5bd9582dc6ff187e93995595",
    duration: 2,
    startDate: "2018-12-01T00:00:00.000Z",
    endDate: "2018-12-03T00:00:00.000Z",
    createdOn: "2018-10-31T07:22:21.159Z",
    modifiedOn: "2018-10-31T07:22:21.159Z",
    __v: 0
  },
  {
    userId: {
      name: "",
      email: "ll@mailinator.com",
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      zipCode: 0,
      _id: "5bd714ef8a33fa1d1eb23175"
    },
    title: "hdfiohgof dhgoidfh ",
    description: "d dfgy9y dfyg9yfg",
    instructorProfileId: "5bd7153d8a33fa1d1eb23177",
    categoryId: {
      name: "Language",
      _id: "5bcdabd6d514912fb0e84aec"
    },
    subCategoryId: {
      name: "Spanish",
      _id: "5bcdac07d514912fb0e84aee"
    },
    lessonType: 2,
    time: "13:00",
    end_time: "15:00",
    limit: 1,
    unlimited: false,
    price: 30,
    day: [],
    streetAddress: "ssd dsf dfs ds fdsf",
    city: "indore",
    state: "MP",
    country: "india",
    zipCode: 452001,
    _id: "5bd95a1ac6ff187e93995598",
    duration: 2,
    startDate: "2018-12-01T00:00:00.000Z",
    endDate: "2018-12-03T00:00:00.000Z",
    createdOn: "2018-10-31T07:30:34.334Z",
    modifiedOn: "2018-10-31T07:30:34.334Z",
    __v: 0
  },
  {
    userId: {
      name: "",
      email: "ll@mailinator.com",
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      zipCode: 0,
      _id: "5bd714ef8a33fa1d1eb23175"
    },
    title: "hdfiohgof dhgoidfh ",
    description: "d dfgy9y dfyg9yfg",
    instructorProfileId: "5bd7153d8a33fa1d1eb23177",
    categoryId: {
      name: "Language",
      _id: "5bcdabd6d514912fb0e84aec"
    },
    subCategoryId: {
      name: "Spanish",
      _id: "5bcdac07d514912fb0e84aee"
    },
    lessonType: 3,
    time: "13:00",
    end_time: "15:00",
    limit: 1,
    unlimited: false,
    price: 30,
    day: [],
    streetAddress: "ssd dsf dfs ds fdsf",
    city: "indore",
    state: "MP",
    country: "india",
    zipCode: 452001,
    _id: "5bd95a3fc6ff187e93995599",
    duration: 2,
    startDate: "2018-12-01T00:00:00.000Z",
    endDate: "2018-12-03T00:00:00.000Z",
    createdOn: "2018-10-31T07:31:11.587Z",
    modifiedOn: "2018-10-31T07:31:11.587Z",
    __v: 0
  }
];

var days = [
  { name: "1 Day", _id: 1 },
  { name: "2 Days", _id: 2 },
  { name: "3 Days", _id: 3 },
  { name: "4 Days", _id: 4 },
  { name: "5 Days", _id: 5 }
];
class SpecialPriceComponent extends React.Component {
  static defaultProps = {
    SpinnerVisible: true
  };
  constructor(props) {
    super(props);
    this.state = {
      classes: classes,
      pushNotification: false,
      email: false,
      //price: 0,
      specialPrice: 0,
      //days: 0,
      explaination: ""
    };
    //this.getClasses();
  }

  getClasses = async () => {
    const { userData } = this.props;
    var obj = {
      user_id: userData._id
    };
    var response = await clientApi.callApi(
      "getAllClasses",
      obj,
      userData.api_token != null ? userData.api_token : userData.token
    );
    if (response.status == "true") {
      classes = response.data;
      console.log("classes == ", classes);

      this.setState({ classes: classes });
    }
  };

  submit = () => {
    alert("In Progress...");
    // Actions.Dashboard({ type: "replace" });
  };

  noChange = () => {};

  render() {
    const { SpinnerVisible } = this.props;
    const {
      classes,
      pushNotification,
      email,
      specialPrice,
      explaination
    } = this.state;
    return (
      <Container>
        <Header title={KeyWords.special + " " + KeyWords.price} />
        <View style={Styles.mainView}>
          <SpinnerLoad spinnerVisible={SpinnerVisible} />
          <View style={[GlobalStyle.leftRightPadding, { flex: 1 }]}>
            <PickerComponent
              title={KeyWords.class}
              icon={Images.categoryImage}
              iconStyle={Styles.menuIcon}
              placeholder={KeyWords.class}
              data={classes}
              callFunction={value => this.noChange(value)}
              fieldWidth={GlobalStyle.width100p}
              height={90}
              enabled
              key="classes"
              selectedValue={classes}
            />
            <View style={[GlobalStyle.divider, Styles.dividerStyle]} />

            <View style={[GlobalStyle.row, Styles.height2p]} />

            <View style={[GlobalStyle.row]}>
              <View style={GlobalStyle.width10p} />
              <View
                style={[GlobalStyle.width90p, GlobalStyle.alignItemsFlexStart]}
              >
                <CheckBoxComponent
                  title={KeyWords.pushNotification}
                  value={!pushNotification}
                  setValues={() =>
                    this.setState({
                      pushNotification: pushNotification
                    })
                  }
                />
              </View>
            </View>

            <View style={[GlobalStyle.row, { marginTop: Util.getHeight(3) }]}>
              <View style={GlobalStyle.width10p} />
              <View
                style={[GlobalStyle.width90p, GlobalStyle.alignItemsFlexStart]}
              >
                <CheckBoxComponent
                  title={KeyWords.email}
                  value={!email}
                  setValues={() => this.setState({ email: false })}
                />
              </View>
            </View>

            <InputComponent
              title={KeyWords.special + " " + KeyWords.price}
              icon={Images.sideMenuIcons.dollar}
              iconStyle={Styles.menuIcon}
              placeholder="$00.00"
              multiline={false}
              value={specialPrice}
              setValues={text => this.setState({ specialPrice: text })}
              fieldWidth={GlobalStyle.width100p}
              height={90}
              maxLength={200}
              keyboardType="numeric"
            />

            <PickerComponent
              title={KeyWords.book + " " + KeyWords.before}
              icon={Images.circleWithCheckImg}
              iconStyle={Styles.circleMenuIcon}
              placeholder={KeyWords.book + " " + KeyWords.before}
              data={days}
              fieldWidth={GlobalStyle.width100p}
              height={90}
              enabled
              callFunction={() => this.noChange("days")}
              key="days"
            />
            <View style={[GlobalStyle.divider, Styles.dividerStyle]} />

            <InputComponent
              title={KeyWords.explaination}
              icon={Images.userIconImg}
              iconStyle={Styles.menuIcon}
              placeholder={KeyWords.explaination}
              multiline
              value={explaination}
              setValues={text => this.setState({ explaination: text })}
              fieldWidth={GlobalStyle.width100p}
              height={90}
              maxLength={200}
              keyboardType="numbers-and-punctuation"
            />

            <View style={Styles.marginTop5p} />
            <ButtonComponent
              btnText={KeyWords.save}
              btnStyle={Styles.btn}
              callFunction={() => this.submit()}
            />

            <ButtonComponent
              btnText={KeyWords.add + " " + KeyWords.another}
              btnStyle={Styles.anotherBtn}
              callFunction={() => this.submit()}
            />
          </View>
        </View>
      </Container>
    );
  }
}

SpecialPriceComponent.propTypes = {
  SpinnerVisible: PropTypes.bool
};

const maptoprops = state => {
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata
  };
};

export default connect(
  maptoprops,
  {}
)(SpecialPriceComponent);
