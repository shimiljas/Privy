import { Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import API from "../common/ApiManager";
import { USERAUTH, LOADEROFF, LOADERON } from "./Types";

let prepareData = undefined;

export const getUserInfo = data => {
  console.log("aa data ", data);
  return dispatch => {
    getUser(dispatch, data);
  };
};

const getUser = async (dispatch, data) => {
  dispatch({
    type:LOADERON
  })
  const method = "getUserProfile";
  console.log("get user == ", data);
  var obj = { user_id: data.user_id };
  var token = data.api_token;
  await API.callPostApiWithToken(method, obj, token)
    .then(res => res.json())
    .then(async res => {
      console.log("get user data res +++ ", res);
      dispatch({
        type:LOADEROFF
      })
      if (res.status == "true") {
        console.log("get user data +++ ", res.data);
        var obj = await prepareData(res.data, token);
        console.log("user data before dispatch -- ", obj);
        dispatch({
          type: USERAUTH,
          payload: obj
        });
        Actions.drawer({
          type: "replace"
        });
      } else {
        if (res.code == 405) {
          Actions.Login({ type: "replace" });
        } 
        else if (res.code == 401) {
          Actions.Login({ type: "replace" });
        } else {
          var obj1 = "";
          dispatch({
            type: USERAUTH,
            payload: obj1
          });
        }
      }
    }).catch(e=>{
      console.log("error",e)
      dispatch({
        type:LOADEROFF

      })
    });
};

export const updateUserData = data => {
  return dispatch => {
    console.log("data from student form == ", data);
    //console.log("user token == ", token);
    updateProfile(dispatch, data);
  };
};

prepareData = async (data, token) => {
  var obj = data.userId;
  obj.profilePic = {
    uri: "http://ip5.hiteshi.com:3002/images/profile/" + obj.profilePic
  };
  if (data.instructChildren != null) {
    obj.roleId = 3;
    obj.aboutMe = data.aboutMe;
    obj.country_permanent = data.country;
    obj.streetAddress_permanent = data.streetAddress;
    obj.state_permanent = data.state;
    obj.city_permanent = data.city;
    obj.zipCode_permanent = data.zipCode;
    obj.permanentAddress = data.permanentAddress;
    obj.instructChildren = data.instructChildren;
    obj.paymentPlan = data.paymentPlan;
  } else {
    obj.roleId = 2;
    obj.age = data.age;
  }
  obj.token = token;
  return obj;
};

const updateProfile = async (dispatch, data) => {
  dispatch({
    type: LOADERON,
    // visible: true
  });
  console.log("update data == ", data);

  await API.callPostApiWithToken(data.methodName, data.data, data.token)
    .then(res => res.json())
    .then(async res => {
      console.log("response from api == ", res);
      var obj = await prepareData(res.data, data.token);
      obj.successMessage = res.message;
      console.log("=== == prepared data +++ ", obj);
      Alert.alert(
        "Success",
        "Profile updated successfully.",
        [
          {
            text: "OK",
            onPress: () => {
              dispatch({
                type: LOADEROFF,
                // visible: false
              });
              dispatch({
                type: USERAUTH,
                payload: obj
              });
            }
          }
        ],
        { cancelable: false }
      );
    })
    .catch(err => {
      console.log("User actions error", err);
      dispatch({
        type: LOADEROFF,
        // visible: false
      });
    });
};
