import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { Container, Content, InputGroup, Input } from "native-base";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Styles from "./Styles";
import Images from "../../../common/images";
import { updateUserData } from "../../../actions";
import GlobalStyle from "../../../common/GlobalStyle";
import {
  SpinnerLoad,
  ButtonComponent,
  InputComponent,
  CheckBoxComponent
} from "../../../components";
import Header from "../../../components/header/header";
import KeyWords from "../../../common/Localization";

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    const { userData } = this.props;
    this.state = {
      _id: userData._id,
      name: userData.name,
      profilePic: userData.profilePic,
      instructChildren: userData.instructChildren,
      base64ProfilePic: "",
      aboutMe: userData.aboutMe,
      country_permanent:
        userData.country_permanent != null ||
        userData.country_permanent != undefined
          ? userData.country_permanent
          : "",
      streetAddress_permanent:
        userData.streetAddress_permanent != null ||
        userData.streetAddress_permanent != undefined
          ? userData.streetAddress_permanent
          : "",
      state_permanent:
        userData.state_permanent != null ||
        userData.state_permanent != undefined
          ? userData.state_permanent
          : "",
      city_permanent:
        userData.city_permanent != null || userData.city_permanent != undefined
          ? userData.city_permanent
          : "",
      zipcode_permanent:
        (userData.zipCode_permanent != null ||
          userData.zipCode_permanent != undefined) &&
        userData.zipCode_permanent > 0
          ? userData.zipCode_permanent
          : "",

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

  update = () => {
    const { userData, updateUserData } = this.props;
    const {
      _id,
      base64ProfilePic,
      instructChildren,
      name,
      country_permanent,
      aboutMe,
      streetAddress_permanent,
      state_permanent,
      city_permanent,
      zipcode_permanent,
      streetAddress,
      state,
      city,
      zipcode,
      country
    } = this.state;

    if (name == "") {
      alert(KeyWords.enter + " " + KeyWords.name);
    } else {
      var obj = {};
      obj.name = name;
      obj.user_id = _id;
      obj.lat = "22.7545";
      obj.long = "75.2454";
      obj.lat_permanent = "22.7545";
      obj.long_permanent = "75.2454";

      // permanent address
      if (country_permanent != "") obj.country_permanent = country_permanent;
      if (streetAddress_permanent != "")
        obj.streetAddress_permanent = streetAddress_permanent;
      if (state_permanent != "") obj.state_permanent = state_permanent;
      if (city_permanent != "") obj.city_permanent = city_permanent;
      if (zipcode_permanent != "") obj.zipCode_permanent = zipcode_permanent;

      // class address
      if (country != "") obj.country = country;
      if (streetAddress != "") obj.streetAddress = streetAddress;
      if (state != "") obj.state = state;
      if (city != "") obj.city = city;
      if (zipcode != "") obj.zipCode = zipcode;

      if (aboutMe != "") obj.aboutMe = aboutMe;
      if (instructChildren != "") obj.instructChildren = instructChildren;

      //photo
      if (base64ProfilePic != "" && base64ProfilePic != undefined)
        obj.profilePic = base64ProfilePic;

      console.log("profile obj == ", obj);
      var data = {
        methodName: "updateInstructorProfile",
        data: obj,
        token: userData.api_token != null ? userData.api_token : userData.token
      };

      updateUserData(data);
    }
  };

  takePicture = () => {
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

  render() {
    const {
      showDefault,
      profilePic,
      instructChildren,
      name,
      country_permanent,
      aboutMe,
      zipcode,
      city,
      state,
      streetAddress,
      zipcode_permanent,
      city_permanent,
      state_permanent,
      streetAddress_permanent
    } = this.state;
    const { SpinnerVisible } = this.props;
    var icon = showDefault ? Images.user : profilePic;
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

              <InputGroup
                borderType={"transparent"}
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
                borderType="transparent"
                style={[GlobalStyle.width60]}
              >
                <Input
                  style={Styles.countryText}
                  placeholder={KeyWords.enter + " " + KeyWords.country}
                  onChangeText={country =>
                    this.setState({ country_permanent: country })
                  }
                  value={country_permanent}
                />
              </InputGroup>
            </View>
            <View>
              <InputComponent
                title={KeyWords.aboutMe}
                icon={Images.premiumImg}
                iconStyle={Styles.icon}
                placeholder={KeyWords.aboutMe}
                multiline
                value={aboutMe}
                setValues={text => this.setState({ aboutMe: text })}
                fieldWidth={GlobalStyle.width100p}
                maxLength={200}
              />

              <Text style={Styles.header}>
                {KeyWords.residence + " " + KeyWords.address}
              </Text>
              <View style={[GlobalStyle.divider, GlobalStyle.width100p]} />
              <InputComponent
                title={KeyWords.street + " " + KeyWords.address}
                icon={Images.locationImg}
                iconStyle={Styles.icon}
                placeholder={KeyWords.street + " " + KeyWords.address}
                multiline
                value={streetAddress_permanent}
                setValues={text =>
                  this.setState({ streetAddress_permanent: text })
                }
                fieldWidth={GlobalStyle.width100p}
                height={70}
                maxLength={100}
              />

              <Text style={Styles.header}>
                {KeyWords.class + " " + KeyWords.location}
              </Text>
              <View style={[GlobalStyle.divider, GlobalStyle.width100p]} />
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
                maxLength={10}
                keyboardType="numeric"
              />

              <View style={[GlobalStyle.row]}>
                <Text style={Styles.lable}>
                  {KeyWords.instructChildren}
                  <Text>?</Text>
                </Text>
              </View>

              <View style={[GlobalStyle.row]}>
                {/* <Icon name={this.props.icon} style={Styles.icon} /> */}
                <View style={[Styles.iconView]}>
                  <Image source={Images.schoolImg} style={Styles.icon} />
                </View>
                <View style={[GlobalStyle.viewCenter, GlobalStyle.row]}>
                  <CheckBoxComponent
                    title={KeyWords.yes}
                    value={instructChildren}
                    setValues={() => this.setState({ instructChildren: true })}
                  />

                  <CheckBoxComponent
                    title={KeyWords.no}
                    value={!instructChildren}
                    setValues={() => this.setState({ instructChildren: false })}
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

ProfileComponent.propTypes = {
  //userData: PropTypes.element.isRequired,
  updateUserData: PropTypes.func.isRequired,
  SpinnerVisible: PropTypes.element.isRequired
};

const maptoprops = state => {
  console.log("instructor data === ", state.User.userdata);
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata
  };
};

export default connect(
  maptoprops,
  { updateUserData }
)(ProfileComponent);
