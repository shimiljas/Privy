import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, AsyncStorage } from "react-native";
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
  CheckBoxComponent,
  InfoInput,
  LocationModal
} from "../../../components";
import Header from '../../../components/header/header';
import clientApi from '../../../common/ApiManager';
import KeyWords from "../../../common/Localization";
import Color from "../../../common/Color";


class StudentProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    const { userData } = this.props;
    this.state = {
      user_id: userData._id,
      isOpenHome:false,
      name: userData.name,
      email: userData.email,
      homeLocation: "",
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
          email: res.data.email,
          homeLocation: res.data.add1,
          classLocation: res.data.add2,
          profilePic: res.data.profilePic,
          age: res.data.age || 0
        })
      }
    });
  }
  
  inputClick = (text, key) => {
    this.setState({[key]: text})
    // switch (key) {
    //   case "email":
    //     this.setState({ email: text });
    //     break;
    //   case "streetAddress":
    //     this.setState({ streetAddress: text });
    //     break;
    //   case "state":
    //     this.setState({ state: text });
    //     break;
    //   case "city":
    //     this.setState({ city: text });
    //     break;
    //   case "zipcode":
    //     this.setState({ zipcode: text });
    //     break;

    //   default:
    //     break;
    // }
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

  // async update() {
  //   const { userData, updateUserData } = this.props;
  //   const {
  //     name,
  //     user_id,
  //     country,
  //     streetAddress,
  //     state,
  //     city,
  //     age,
  //     zipcode,
  //     base64ProfilePic
  //   } = this.state;
  //   if (name == "") {
  //     alert(KeyWords.enter + " " + KeyWords.name);
  //   } else {
  //     var obj = {};
  //     obj.name = name;
  //     obj.user_id = user_id;
  //     obj.lat = "22.7545";
  //     obj.long = "75.2454";

  //     if (country != "") obj.country = country;
  //     if (streetAddress != "") obj.streetAddress = streetAddress;
  //     if (state != "") obj.state = state;
  //     if (city != "") obj.city = city;
  //     if (zipcode != "") obj.zipCode = zipcode;
  //     if (age != "") obj.age = age;

  //     if (base64ProfilePic != "" && base64ProfilePic != undefined)
  //       obj.profilePic = base64ProfilePic;
  //     var data = {
  //       methodName: "updateStudentProfile",
  //       data: obj,
  //       token: userData.api_token != null ? userData.api_token : userData.token
  //     };

  //     console.log("before calling api", userData, data);
  //     updateUserData(data);
  //   }
  // }

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
    } = this.state;

    const obj = {
      user_id: _id,
      name,
      aboutMe,
      add1: homeLocation,
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

  render() {
    const { showDefault, profilePic, SpinnerVisible } = this.state;
    var icon = showDefault ? Images.user : {uri : profilePic};
    const {
      name,
      country,
      age,
      email,
      streetAddress,
      zipcode,
      city,homeLocation,
      state,isOpenHome
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

              <View style={{ height: 10 }} />
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

              <Text style={Styles.lable}>
                {KeyWords.ageOver18}
                <Text>?</Text>
              </Text>
              <View style={GlobalStyle.row}>
                <Image source={Images.schoolImg} style={Styles.icon} />
                <View style={Styles.radioView}>
                  <CheckBoxComponent
                    title={KeyWords.yes}
                    value={age == 1}
                    setValues={() => this.setState({ age: 1 })}
                  />

                  <CheckBoxComponent
                    title={KeyWords.no}
                    value={age == 0}
                    setValues={() => this.setState({ age: 0 })}
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
