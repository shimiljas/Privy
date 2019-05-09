import { Alert, AsyncStorage } from "react-native";
import { Actions } from "react-native-router-flux";
import API from "../common/ApiManager";
import { SCHEDULES, LOADEROFF, LOADERON, SCHEDULE, APIRESPONSE } from "./Types";
import KeyWords from "../common/Localization";

export const getAllSchedules = data => {
  return dispatch => {
    getSchedules(dispatch, data);
  };
};

export const addClassData = data => {
  //console.log("add class ",data);
  return dispatch => {
    sendClassDataOpenForm(dispatch, data);
  };
};

export const addSchedule = data => {
  return dispatch => {
    console.log("add class == ", data);
    //console.log("user token == ", token);
    addClass(dispatch, data);
  };
};

const sendClassDataOpenForm = async (dispatch, data) => {
  //console.log("new add edit class == ", data);
  dispatch({
    type: SCHEDULE,
    payload: data
  });
  Actions.AddEditSchedule({ type: "replace" });
};

const getSchedules = async (dispatch, data) => {
  console.log("getAllClasses == ", data);
  dispatch({
    type: LOADERON
    // visible: true
  });
  const method = "get_classes_ins.php";
  var obj = { user_id: await AsyncStorage.getItem("userId") };
  var token = data.api_token;
  await API.callPostApiWithToken(method, obj, token)
    .then(res => res.json())
    .then(async res => {
      dispatch({
        type: LOADEROFF
      });
      if (res.success == 1) {
        dispatch({
          type: SCHEDULES,
          payload: res.data
        });
        //     dispatch({
        //       type: LOADEROFF,
        //       // visible: false
        // });
        dispatch({
          type: APIRESPONSE,
          payload: { success: false }
        });
        Actions.Schedules({
          type: "replace"
        });
      } else {
        if (res.code == 405) {
          Actions.Login({ type: "replace" });
        } else {
          // dispatch({
          //   type: LOADERON,
          //   // visible: false
          // });
        }
      }
    });
};

const addClass = async (dispatch, data) => {
  // dispatch({
  //   type: LOADERON,
  //   visible: true
  // });
  await API.callPostApiWithToken(data.methodName, data.data, data.token)
    .then(res => res.json())
    .then(async res => {
      console.log("=== == prepared data +++ ", res);
      if (res.status === "true") {
        var obj = res.data;
        obj.successMessage = res.message;
        console.log("=== == prepared data +++ ", obj);
        Alert.alert(
          KeyWords.successs,
          obj.successMessage,
          [
            {
              text: KeyWords.ok,
              onPress: () => {
                dispatch({
                  type: LOADEROFF,
                  visible: false
                });

                dispatch({
                  type: APIRESPONSE,
                  payload: { success: true }
                });
              }
            }
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(
          KeyWords.successs,
          obj.successMessage,
          [
            {
              text: KeyWords.ok,
              onPress: () => {
                dispatch({
                  type: LOADEROFF,
                  visible: false
                });
              }
            }
          ],
          { cancelable: false }
        );
      }
    })
    .catch(() => {
      dispatch({
        type: LOADEROFF,
        visible: false
      });
    });
};
