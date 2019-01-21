import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Container, Content, InputGroup, Input } from "native-base";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Styles from "./Styles";
import Images from "../../../common/images";
import GlobalStyle from "../../../common/GlobalStyle";
import { updateUserData } from "../../../actions";
import {
  SpinnerLoad,
  ButtonComponent,
  InputComponent,
  CheckBoxComponent
} from "../../../components";
import Header from '../../../components/header/header';
import KeyWords from "../../../common/Localization";


class StudentProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    const { userData } = this.props;
    this.state = {
      user_id: userData._id,
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
  
  inputClick = (text, key) => {
    switch (key) {
      case "email":
        this.setState({ email: text });
        break;
      case "streetAddress":
        this.setState({ streetAddress: text });
        break;
      case "state":
        this.setState({ state: text });
        break;
      case "city":
        this.setState({ city: text });
        break;
      case "zipcode":
        this.setState({ zipcode: text });
        break;

      default:
        break;
    }
  };
  componentCall = data => {
    return (
      <InputComponent
        title={data.title}
        icon={data.icon}
        iconStyle={Styles.icon}
        placeholder={data.title}
        multiline={data.multiline}
        value={data.value}
        setValues={text => this.inputClick(text, data.key)}
        fieldWidth={GlobalStyle.width100p}
        height={data.height}
        maxLength={data.maxLength}
        keyboardType={data.keyboardType}
      />
    );
  };
  takePicture = async function() {
    var options = {
      title: KeyWords.select + " " + KeyWords.avatar,
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };

    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        let source = { uri: response.uri };
        // You can also display the image using data:
        source = { uri: "data:image/jpeg;base64," + response.data };

        this.setState({
          profilePic: source,
          base64ProfilePic: response.data
        });
      }
    });
  };

  async update() {
    const { userData, updateUserData } = this.props;
    const {
      name,
      user_id,
      country,
      streetAddress,
      state,
      city,
      age,
      zipcode,
      base64ProfilePic
    } = this.state;
    if (name == "") {
      alert(KeyWords.enter + " " + KeyWords.name);
    } else {
      var obj = {};
      obj.name = name;
      obj.user_id = user_id;
      obj.lat = "22.7545";
      obj.long = "75.2454";

      if (country != "") obj.country = country;
      if (streetAddress != "") obj.streetAddress = streetAddress;
      if (state != "") obj.state = state;
      if (city != "") obj.city = city;
      if (zipcode != "") obj.zipCode = zipcode;
      if (age != "") obj.age = age;

      if (base64ProfilePic != "" && base64ProfilePic != undefined)
        obj.profilePic = base64ProfilePic;
      var data = {
        methodName: "updateStudentProfile",
        data: obj,
        token: userData.api_token != null ? userData.api_token : userData.token
      };

      console.log("before calling api", userData, data);
      updateUserData(data);
    }
  }

  render() {
    const { showDefault, profilePic, SpinnerVisible } = this.state;
    var icon = showDefault ? Images.user : profilePic;
    const {
      name,
      country,
      age,
      email,
      streetAddress,
      zipcode,
      city,
      state
    } = this.state;
    return (
      <Container>
        <Header title={KeyWords.profile} />
        <Content>
          <SpinnerLoad spinnerVisible={SpinnerVisible} />
          <View style={GlobalStyle.leftRightPadding}>
            <View style={[GlobalStyle.container, GlobalStyle.viewCenter]}>
              <View style={Styles.profilePicView}>
                <View style={GlobalStyle.row}>
                  <TouchableOpacity onPress={() => this.takePicture()}>
                    <Image source={icon} style={Styles.profilePic} />
                    <Image
                      source={Images.cameraIcon}
                      style={Styles.cameraIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* <Text style={nameText}>{this.state.name}</Text> */}
              <InputGroup
                borderType="underline"
                style={[GlobalStyle.width60, Styles.marginTop3p]}
              >
                <Input
                  style={Styles.nameText}
                  placeholder={KeyWords.enter + " " + KeyWords.name}
                  onChangeText={name => this.setState({ name: name })}
                  value={name}
                />
              </InputGroup>
              <InputGroup
                borderType="underline"
                style={[GlobalStyle.width60, Styles.marginTop3p]}
              >
                <Input
                  style={Styles.nameText}
                  placeholder={KeyWords.enter + " " + KeyWords.country}
                  onChangeText={country => this.setState({ country: country })}
                  value={country}
                />
              </InputGroup>
            </View>
            <View style={Styles.padding20}>
              {/* <FlatList
                data={ComponentList}
                // extraData={this.state}
                renderItem={({ item }) => this.componentCall(item)}
                keyExtractor={item => item.key + ""}
              /> */}
              <InputComponent
                title={KeyWords.email}
                icon={Images.premiumImg}
                iconStyle={Styles.icon}
                placeholder={KeyWords.email}
                multiline
                value={email}
                setValues={text => this.setState({ email: text })}
                fieldWidth={GlobalStyle.width100p}
                height={90}
                maxLength={200}
                keyboardType="email-address"
                fieldDisable
              />

              <InputComponent
                title={KeyWords.street + " " + KeyWords.address}
                icon={Images.locationImg}
                iconStyle={Styles.icon}
                placeholder={KeyWords.street + " " + KeyWords.address}
                multiline
                value={streetAddress}
                setValues={text => this.setState({ streetAddress: text })}
                fieldWidth={GlobalStyle.width100p}
                height={70}
                maxLength={100}

              />

              <InputComponent
                title={KeyWords.state}
                icon={Images.locationImg}
                iconStyle={Styles.icon}
                placeholder={KeyWords.state}
                multiline={false}
                value={state}
                setValues={text => this.setState({ state: text })}
                fieldWidth={GlobalStyle.width100p}
                height={70}
                maxLength={100}

              />

              <InputComponent
                title={KeyWords.city}
                icon={Images.locationImg}
                iconStyle={Styles.icon}
                placeholder={KeyWords.city}
                multiline={false}
                value={city}
                setValues={text => this.setState({ city: text })}
                fieldWidth={GlobalStyle.width100p}
                height={70}
                maxLength={100}

              />

              <InputComponent
                title={KeyWords.zipcode}
                icon={Images.locationImg}
                iconStyle={Styles.icon}
                placeholder={KeyWords.zipcode}
                multiline={false}
                value={zipcode}
                setValues={text => this.setState({ zipcode: text })}
                fieldWidth={GlobalStyle.width100p}
                height={70}
                maxLength={100}
                keyboardType="numeric"
              />

              <Text style={Styles.lable}>
                {KeyWords.ageOver18}
                <Text>?</Text>
              </Text>
              <View style={GlobalStyle.row}>
                <Image source={Images.schoolImg} style={Styles.icon} />
                <View style={Styles.radioView}>
                  <CheckBoxComponent
                    title={KeyWords.yes}
                    value={age}
                    setValues={() => this.setState({ age: true })}
                  />

                  <CheckBoxComponent
                    title={KeyWords.no}
                    value={!age}
                    setValues={() => this.setState({ age: false })}
                  />
                </View>
              </View>

              <View style={Styles.btnView}>
                <ButtonComponent
                  btnText={KeyWords.save}
                  btnStyle={Styles.btn}
                  callFunction={() => this.update()}
                />
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

StudentProfileComponent.propTypes = {
  userData: PropTypes.element.isRequired,
  updateUserData: PropTypes.func.isRequired
};

//export default StudentProfileComponent;
const maptoprops = state => {
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata,
    token: state.User.userdata.api_token
      ? state.User.userdata.api_token
      : state.User.userdata.token
  };
};

export default connect(
  maptoprops,
  { updateUserData }
)(StudentProfileComponent);
