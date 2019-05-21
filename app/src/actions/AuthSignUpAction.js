import { AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  LOADEROFF,
  LOADERON,
  USERAUTH,
  FORMCHANGE,
  PASSFORMCHNAGE,
  MODELPASSWORD
} from "./Types";
import API from "../common/ApiManager";
import Url from "../common/AppSettings";
import Util from "../common/Util";
import Color from "../common/Color";

export const SignUser = data => {
  return dispatch => {
    SignMe(dispatch, data);
  };
};

export const SignUpUserSucsess = () => {
  return dispatch => {
    SuceessUser(dispatch);
  };
};
export const ChangePasswordCall = data => {
  return dispatch => {
    getChangePass(dispatch, data);
  };
};
export const ResetPasswordCall = data => {
  return dispatch => {
    resetPassword(dispatch, data);
  };
};
export const PasswordModel = data => {
  return dispatch => {
    hidePasswordModel(dispatch, data);
  };
};
const getChangePass = async (dispatch, data) => {
  dispatch({
    type: LOADERON
    // visible: true
  });
  const changePass = "sendResetPasswordOTP";
  await API.callPostApi(changePass, data)
    .then(res => res.json())
    .then(async res => {
      console.log("response change pass :", res);
      if (res.status == "true") {
        dispatch({
          type: PASSFORMCHNAGE,
          passform: true
        });
        dispatch({
          type: MODELPASSWORD,
          ModelVisible: true,
          message:
            "Thanks. A OTP verification email has been sent to address you mentioned."
        });
        dispatch({
          type: LOADEROFF
          // visible: false
        });
      } else {
        dispatch({
          type: MODELPASSWORD,
          ModelVisible: true,
          message: res.message
        });
        dispatch({
          type: LOADEROFF
          // visible: false
        });
      }
    })
    .catch(err => {
      console.log("response change pass error:", err);
    });
};
const resetPassword = async (dispatch, data) => {
  dispatch({
    type: LOADERON
    // visible: true
  });
  const changePass = "resetPassword";
  console.log("data", data);
  await API.callPostApi(changePass, data)
    .then(res => res.json())
    .then(async res => {
      console.log("resetPassword pass :", res);
      dispatch({
        type: MODELPASSWORD,
        ModelVisible: true,
        message: res.message
      });
      dispatch({
        type: LOADEROFF
        // visible: false
      });
      // if (res.status == "true") {
      //   dispatch({
      //     type: MODELPASSWORD,
      //     ModelVisible: true,
      //     message: res.message
      //   });
      //   dispatch({
      //     type: LOADEROFF,
      //     // visible: false
      //   });
      //   //Actions.Login({ type: "replace" });
      // } else {
      //   dispatch({
      //     type: MODELPASSWORD,
      //     ModelVisible: true,
      //     message: res.message
      //   });
      //   dispatch({
      //     type: LOADEROFF,
      //     // visible: false
      //   });
      // }
    })
    .catch(err => {
      dispatch({
        type: LOADEROFF
        // visible: false
      });
      console.log("resetPassword error:", err);
    });
};
const SuceessUser = dispatch => {
  dispatch({
    type: FORMCHANGE,
    successData: false
  });
};
const hidePasswordModel = (dispatch, data) => {
  dispatch({
    type: MODELPASSWORD,
    ModelVisible: false,
    message: ""
  });
  console.log("pop login", data.page);
  if (data.page == "2") {
    Actions.pop();
  }
};
const SignMe = (dispatch, data) => {
  dispatch({
    type: LOADERON
  });
  dispatch({
    type: FORMCHANGE,
    successData: false
  });
  const signUp = "register.php";
  API.callPostApi(signUp, data)
    .then(res => res.json())
    .then(res => {
      dispatch({
        type: LOADEROFF
      });
      console.log("RESULT FOR REGISTER", res);
      if (res.success == 1) {
        dispatch({
          type: FORMCHANGE,
          successData: true
        });
      } else {
        Util.ShowToast(res.message, 2000, Color.whiteClr, Color.red);

        console.log("error sighup", res.message);
      }
    })
    .catch(err => {
      dispatch({
        type: LOADEROFF
      });
      console.log("SignMe error:", err);
    });
};

export const LoginUser = data => {
  return dispatch => {
    LogMeIn(dispatch, data);
  };
};

const LogMeIn = async (dispatch, data) => {
  dispatch({
    type: LOADERON
    // visible: true
  });
  const signin = "login.php";
  await API.callPostApi(signin, data)
    .then(async res => {
      console.log("response signIn :", res);

      if (res.success == 1) {
        await AsyncStorage.setItem("userId", String(res.data._id));
        await AsyncStorage.setItem("apiToken", String(res.data.api_token));
        await AsyncStorage.setItem("roleId", String(res.data.roleId));
        await AsyncStorage.setItem("USEROBJ", JSON.stringify(res.data));
        res.data.profilePic = {
          uri: Url + "images/profile/" + res.data.profilePic + ""
        };
        dispatch({
          type: USERAUTH,
          payload: res.data
        });
        {
          res.data.roleId == 1
            ? Actions.FirstLogin({
                type: "replace"
              })
            : Actions.drawer({
                type: "replace"
              });
        }
        dispatch({
          type: LOADEROFF
        });
      }
      // else if(res.message == "User not found."){

      //   dispatch({
      //     type: LOADEROFF,
      //   });
      //   Util.ShowToast(res.message, 2000, Color.whiteClr, Color.red);

      //   console.log("login error--", res);
      // }
      else {
        dispatch({
          type: LOADEROFF
        });
      }
    })
    .catch(err => {
      dispatch({
        type: LOADEROFF
      });
      console.log("login error:", err);
    });
};
