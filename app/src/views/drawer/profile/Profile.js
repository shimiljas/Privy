import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput, AsyncStorage } from "react-native";
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
  CheckBoxComponent,
  InfoInput,
  LocationModal
} from "../../../components";
import clientApi from '../../../common/ApiManager';
import Header from "../../../components/header/header";
import KeyWords from "../../../common/Localization";
import Color from "../../../common/Color";

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    const { userData } = this.props;
    this.state = {
      isOpenClass: false,
      isOpenHome: false,
      homeLocation: "",
      classLocation: "",
    //   _id: userData._id,
    //   name: userData.name,
    //   profilePic: userData.profilePic,
    //   instructChildren: userData.instructChildren,
    //   base64ProfilePic: "",
    //   aboutMe: userData.aboutMe,
    //   country_permanent:
    //     userData.country_permanent != null ||
    //     userData.country_permanent != undefined
    //       ? userData.country_permanent
    //       : "",
    //   streetAddress_permanent:
    //     userData.streetAddress_permanent != null ||
    //     userData.streetAddress_permanent != undefined
    //       ? userData.streetAddress_permanent
    //       : "",
    //   state_permanent:
    //     userData.state_permanent != null ||
    //     userData.state_permanent != undefined
    //       ? userData.state_permanent
    //       : "",
    //   city_permanent:
    //     userData.city_permanent != null || userData.city_permanent != undefined
    //       ? userData.city_permanent
    //       : "",
    //   zipcode_permanent:
    //     (userData.zipCode_permanent != null ||
    //       userData.zipCode_permanent != undefined) &&
    //     userData.zipCode_permanent > 0
    //       ? userData.zipCode_permanent
    //       : "",

    //   country:
    //     userData.country != null || userData.country != undefined
    //       ? userData.country
    //       : "",
    //   streetAddress:
    //     userData.streetAddress != null || userData.streetAddress != undefined
    //       ? userData.streetAddress
    //       : "",
    //   state:
    //     userData.state != null || userData.state != undefined
    //       ? userData.state
    //       : "",
    //   city:
    //     userData.city != null || userData.city != undefined
    //       ? userData.city
    //       : "",
    //   zipcode:
    //     (userData.zipCode != null || userData.zipCode != undefined) &&
    //     userData.zipCode > 0
    //       ? userData.zipCode
    //       : ""
    };
  }

  async componentDidMount() {
    let user_id = await AsyncStorage.getItem("userId");
    clientApi.callPostApi("get_user_profile.php", {user_id}).then(res =>{
      console.log("RESUSER", res);
      if(res.success == 1) {
        this.setState({
          _id: user_id,
          name: res.data.name,
          instructChildren: res.data.instructChildren,
          country: res.data.country || "",
          homeLocation: res.data.add1,
          classLocation: res.data.add2,
          profilePic: res.data.profilePic
        })
      }
    });
  }

  update = () => {
    // const { userData, updateUserData } = this.props;
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
      country,
      homeLocation,
      classLocation
    } = this.state;

    const obj = {
      user_id: _id,
      name,
      aboutMe,
      add1: homeLocation,
      add2: classLocation,
      instructChildren,
      country,
    }

    clientApi.callPostApi("update_user_profile.php", {...obj}).then(res =>{
      console.log(res)
      if(res.success == 1) {
        alert(res.message);
        // this.setState({
        //   _id: user_id,
        //   name: res.data.name,
        //   instructChildren: res.data.instructChildren,
        //   countryText: res.data.country || "",
        //   homeLocation: res.data.add1,
        //   classLocation: res.data.add2
        // })
      }
    });

    // if (name == "") {
    //   alert(KeyWords.enter + " " + KeyWords.name);
    // } else {
    //   var obj = {};
    //   obj.name = name;
    //   obj.user_id = _id;
    //   obj.lat = "22.7545";
    //   obj.long = "75.2454";
    //   obj.lat_permanent = "22.7545";
    //   obj.long_permanent = "75.2454";

    //   // permanent address
    //   if (country_permanent != "") obj.country_permanent = country_permanent;
    //   if (streetAddress_permanent != "")
    //     obj.streetAddress_permanent = streetAddress_permanent;
    //   if (state_permanent != "") obj.state_permanent = state_permanent;
    //   if (city_permanent != "") obj.city_permanent = city_permanent;
    //   if (zipcode_permanent != "") obj.zipCode_permanent = zipcode_permanent;

    //   // class address
    //   if (country != "") obj.country = country;
    //   if (streetAddress != "") obj.streetAddress = streetAddress;
    //   if (state != "") obj.state = state;
    //   if (city != "") obj.city = city;
    //   if (zipcode != "") obj.zipCode = zipcode;

    //   if (aboutMe != "") obj.aboutMe = aboutMe;
    //   if (instructChildren != "") obj.instructChildren = instructChildren;

    //   //photo
    //   if (base64ProfilePic != "" && base64ProfilePic != undefined)
    //     obj.profilePic = base64ProfilePic;

    //   console.log("profile obj == ", obj);
    //   var data = {
    //     methodName: "updateInstructorProfile",
    //     data: obj,
    //     token: userData.api_token != null ? userData.api_token : userData.token
    //   };

    //   updateUserData(data);
    // }
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
      country,
      aboutMe,
      zipcode,
      city,
      state,
      streetAddress,
      zipcode_permanent,
      city_permanent,
      state_permanent,
      streetAddress_permanent,
      isOpenClass,
      isOpenHome,
      homeLocation,
      classLocation
    } = this.state;
    const { SpinnerVisible } = this.props;
    var icon = showDefault ? Images.user : {uri: profilePic};
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
                    this.setState({ country })
                  }
                  value={country}
                />
              </InputGroup>
            </View>
            <View>
              <InfoInput
                title={KeyWords.aboutMe}
                icon={Images.premiumImg}
                iconStyle={Styles.icon}
              >
                <TextInput
                  placeholder={KeyWords.aboutMe}
                  maxLength={200}
                  multiline
                  onChangeText={text => this.setState({ aboutMe: text })}
                  style={{
                    color: Color.darkGray,
                    flex: 1,
                    paddingHorizontal: 0,
                    paddingVertical: 5
                  }}
                  value={aboutMe}
                />
              </InfoInput>
              <View style={{ height: 20 }} />
              <TouchableOpacity
                onPress={() => this.setState({ isOpenHome: !isOpenHome })}
              >
                <InfoInput
                  title={KeyWords.residence}
                  icon={Images.locationImg}
                  iconStyle={Styles.icon}
                >
                  <Text
                    style={{
                      color: Color.darkGray,
                      flex: 1,
                      paddingHorizontal: 0,
                      paddingVertical: 10,
                      borderBottomColor: Color.grayClg,
                      borderBottomWidth: 0.5
                    }}
                  >
                    {homeLocation || "Type your home location here."}
                  </Text>
                </InfoInput>
              </TouchableOpacity>
              <View style={{ height: 20 }} />
              <TouchableOpacity
                onPress={() => this.setState({ isOpenClass: !isOpenClass })}
              >
                <InfoInput
                  title={KeyWords.class + " " + KeyWords.location}
                  icon={Images.schoolImg}
                  iconStyle={Styles.icon}
                >
                  <Text
                    style={{
                      color: Color.darkGray,
                      flex: 1,
                      paddingHorizontal: 0,
                      paddingVertical: 10,
                      borderBottomColor: Color.grayClg,
                      borderBottomWidth: 0.5
                    }}
                  >
                    {classLocation || "Type your class location here."}
                  </Text>
                </InfoInput>
              </TouchableOpacity>
              <View style={{ height: 20 }} />
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
                    value={instructChildren == 1}
                    setValues={() => this.setState({ instructChildren: 1 })}
                  />

                  <CheckBoxComponent
                    title={KeyWords.no}
                    value={instructChildren == 0}
                    setValues={() => this.setState({ instructChildren: 0 })}
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
          <LocationModal
            isOpen={isOpenHome}
            title={
              "Enter " + KeyWords.residence + " address"}
            onSave={loc =>
              this.setState({
                homeLocation: loc.Address,
                isOpenHome: !isOpenHome
              })
            }
            onClose={() => this.setState({ isOpenHome: !isOpenHome })}
          />
          <LocationModal
            isOpen={isOpenClass}
            title={"Enter " +KeyWords.class+ " address"}
            onSave={loc =>
              this.setState({
                classLocation: loc.Address,
                isOpenClass: !isOpenClass
              })
            }
            onClose={() => this.setState({ isOpenClass: !isOpenClass })}
          />
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
  return {
    SpinnerVisible: state.Loader.visible,
    userData: state.User.userdata
  };
};

export default connect(
  maptoprops,
  { updateUserData }
)(ProfileComponent);
