import React from "react";
import { View, AsyncStorage, ScrollView, Text, Image } from "react-native";
import { connect } from "react-redux";
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
  PickerComponent,
  DatePickerComponent
} from "../../../components";
import KeyWords from "../../../common/Localization";
import Header from "../../../components/header/header";

// temprary json response will remove it.
var classes = [
  {
    id:1,
    title:"Mathematics"
  },
  {
    id:2,
    title:"Physics"
  },
  {
    id:3,
    title:"Chemistry"
  },
];
// var classes = [
//   {
//     userId: {
//       name: "",
//       email: "ll@mailinator.com",
//       streetAddress: "",
//       city: "",
//       state: "",
//       country: "",
//       zipCode: 0,
//       _id: "5bd714ef8a33fa1d1eb23175"
//     },
//     title: "hdfiohgof dhgoidfh ",
//     description: "d dfgy9y dfyg9yfg",
//     instructorProfileId: "5bd7153d8a33fa1d1eb23177",
//     categoryId: {
//       name: "Language",
//       _id: "5bcdabd6d514912fb0e84aec"
//     },
//     subCategoryId: {
//       name: "English",
//       _id: "5bcdabfed514912fb0e84aed"
//     },
//     lessonType: 2,
//     time: "13:00",
//     end_time: "15:00",
//     limit: 1,
//     unlimited: false,
//     price: 30,
//     day: [],
//     streetAddress: "ssd dsf dfs ds fdsf",
//     city: "indore",
//     state: "MP",
//     country: "india",
//     zipCode: 452001,
//     _id: "5bd9582dc6ff187e93995595",
//     duration: 2,
//     startDate: "2018-12-01T00:00:00.000Z",
//     endDate: "2018-12-03T00:00:00.000Z",
//     createdOn: "2018-10-31T07:22:21.159Z",
//     modifiedOn: "2018-10-31T07:22:21.159Z",
//     __v: 0
//   },
//   {
//     userId: {
//       name: "",
//       email: "ll@mailinator.com",
//       streetAddress: "",
//       city: "",
//       state: "",
//       country: "",
//       zipCode: 0,
//       _id: "5bd714ef8a33fa1d1eb23175"
//     },
//     title: "hdfiohgof dhgoidfh ",
//     description: "d dfgy9y dfyg9yfg",
//     instructorProfileId: "5bd7153d8a33fa1d1eb23177",
//     categoryId: {
//       name: "Language",
//       _id: "5bcdabd6d514912fb0e84aec"
//     },
//     subCategoryId: {
//       name: "Spanish",
//       _id: "5bcdac07d514912fb0e84aee"
//     },
//     lessonType: 2,
//     time: "13:00",
//     end_time: "15:00",
//     limit: 1,
//     unlimited: false,
//     price: 30,
//     day: [],
//     streetAddress: "ssd dsf dfs ds fdsf",
//     city: "indore",
//     state: "MP",
//     country: "india",
//     zipCode: 452001,
//     _id: "5bd95a1ac6ff187e93995598",
//     duration: 2,
//     startDate: "2018-12-01T00:00:00.000Z",
//     endDate: "2018-12-03T00:00:00.000Z",
//     createdOn: "2018-10-31T07:30:34.334Z",
//     modifiedOn: "2018-10-31T07:30:34.334Z",
//     __v: 0
//   },
//   {
//     userId: {
//       name: "",
//       email: "ll@mailinator.com",
//       streetAddress: "",
//       city: "",
//       state: "",
//       country: "",
//       zipCode: 0,
//       _id: "5bd714ef8a33fa1d1eb23175"
//     },
//     title: "hdfiohgof dhgoidfh ",
//     description: "d dfgy9y dfyg9yfg",
//     instructorProfileId: "5bd7153d8a33fa1d1eb23177",
//     categoryId: {
//       name: "Language",
//       _id: "5bcdabd6d514912fb0e84aec"
//     },
//     subCategoryId: {
//       name: "Spanish",
//       _id: "5bcdac07d514912fb0e84aee"
//     },
//     lessonType: 3,
//     time: "13:00",
//     end_time: "15:00",
//     limit: 1,
//     unlimited: false,
//     price: 30,
//     day: [],
//     streetAddress: "ssd dsf dfs ds fdsf",
//     city: "indore",
//     state: "MP",
//     country: "india",
//     zipCode: 452001,
//     _id: "5bd95a3fc6ff187e93995599",
//     duration: 2,
//     startDate: "2018-12-01T00:00:00.000Z",
//     endDate: "2018-12-03T00:00:00.000Z",
//     createdOn: "2018-10-31T07:31:11.587Z",
//     modifiedOn: "2018-10-31T07:31:11.587Z",
//     __v: 0
//   }
// ];
class SpecialPriceComponent extends React.Component {
  static defaultProps = {
    SpinnerVisible: true
  };
  constructor(props) {
    super(props);
    console.log('user data', this.props);
    this.state = {
      userData: {},
      classes: classes,
      selectedClass: {},
      pushNotification: true,
      email: true,
      //price: 0,
      specialPrice: 0,
      //original price
      originalPrice: 0,
      beforeDate: "Start Date",
      showStartDatePicker: false,
      explaination: ""
    };
  }

  getClasses = async () => {
    const { userData } = this.state;
    var obj = {
      user_id: +userData._id
    };
    var response = await clientApi.callApi(
      "get_classes_ins.php",
      obj,
      userData.api_token != null ? userData.api_token : userData.token
    );
    if (response.success == 1) {
      classes = response.data;
      console.log("classes == ", classes);

      this.setState({ classes: classes });
    }
  };

  componentDidMount = async () => {
    let data = {
      role_id: await AsyncStorage.getItem("roleId"),
      user_id: await AsyncStorage.getItem("userId"),
      api_token: await AsyncStorage.getItem("apiToken")
    };
    this.setState({userData: {roleId: data.role_id, _id: data.user_id, token: data.api_token}});
    await this.getClasses();
  };

  addAnother () {
    alert("Fill the details to add Another Field");
    this.setState( { selectedClass:{}, specialPrice:'', originalPrice:'', explaination:''});
    }
  submit = async () => {
    const { selectedClass,
      userData,
      pushNotification,
      email,
      specialPrice,
      beforeDate,
      explaination} = this.state;
    var obj = {
      user_id: +userData._id,
      cid: selectedClass.id,
      isp:+pushNotification,
      ise:+email,
      spfee:specialPrice,
      bd:beforeDate,
      exp:explaination
    };
    if (+specialPrice > +originalPrice) {
      alert('Special price should be lesser than original price');
      return;
    }
    console.log(userData);
    var response = await clientApi.callApi(
      "update_special_price.php",
      obj,
      userData.api_token != null ? userData.api_token : userData.token
    );
    if (response.success == 1) {
      alert("Special Price added successfully");
      console.log(response);
    }
  };

  _handleDatePicked(date) {
    var d = new Date(date);
    this.setState({
      beforeDate: d.getFullYear() + "/" + (d.getMonth()  + 1) + "/" + d.getDate(),
      showStartDatePicker: false,
      minimumDate: new Date(date)
    });
}

  getSelectedValue = (value, key) => {
    switch (key) {
      case "class":
        this.setState({ selectedClass: value, specialPrice: "" + value.spfee,
          explaination:value.exp, pushNotification :(value.isp === 1) ? true:false,
          email:(value.ise === 1) ? true:false,  
          originalPrice: "" + value.fee, beforeDate:value.bd});
        break;
      case "date":
        this.setState({ beforeDate: value });
        break;
      default:
        console.log("getSelectedValue key not match");
        break;
    }
    console.log("selected value==", value);
  };

  render() {
    const { SpinnerVisible } = this.props;
    const {
      classes,
      pushNotification,
      email,
      specialPrice,
      originalPrice,
      explaination,
      beforeDate,
      showStartDatePicker
    } = this.state;
    return (
      <ScrollView>
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
              callFunction={(value) => this.getSelectedValue(value, "class")}
              fieldWidth={GlobalStyle.width100p}
              height={90}
              enabled
              key="classes"
              selectedValue={classes[0]}
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
                  value={pushNotification}
                  setValues={() =>
                    this.setState({
                      pushNotification: !pushNotification
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
                  value={email}
                  setValues={() => this.setState({ email: !email })}
                />
              </View>
            </View>
            <View style={Styles.marginBottom3}>
              <Text style={Styles.lable}>{KeyWords.original}</Text>
            </View>
            <View style={[GlobalStyle.row]}>
            <View
            style={[
              GlobalStyle.viewCenter,
              GlobalStyle.width10p,
              GlobalStyle.alignItemsFlexStart,
              Styles.marginTop5p
            ]}
          >
            <Image source={Images.sideMenuIcons.dollar} style={Styles.menuIcon} />
          </View>
            <View>
              <Text style={Styles.lable}>{originalPrice}</Text>
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
            <DatePickerComponent
            title={KeyWords.book + " " + KeyWords.before}
            icon={Images.premiumImg}
            iconStyle={Styles.premium}
            placeholder={KeyWords.startDate}
            data={beforeDate}
            fieldWidth={Styles.width100p}
            height={90}
            enabled
            minimumDate={new Date()}
            maximumDate = {new Date(beforeDate)}
            key="startDate"
            mode="date"
            showDateTimePicker={() => this.setState({ showStartDatePicker: true })}
            value={beforeDate}
            isDateTimePickerVisible={showStartDatePicker}
            onConfirm={value => this._handleDatePicked( value)}
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
              callFunction={() => this.addAnother()}
            />
          </View>
        </View>
      </ScrollView>
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
