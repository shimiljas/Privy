import { Alert } from "react-native";
import {  LOADEROFF, LOADERON, GETALLMESSAGE } from "./Types";
import API from "../common/ApiManager";

export const SendMessage = data => {
  return dispatch => {
    getSendMessage(dispatch, data);
  };
};

export const AllMessage = data => {
  return dispatch => {
    getAllMessage(dispatch, data);
  };
};
const getAllMessage = async (dispatch, data) => {
  dispatch({
    type: LOADERON,
    // visible: true
  });
  const messageUrlKey = "get_messages.php";
  var token = data.api_token;
  var obj = {
    user_id: data.user_id
  };
  console.log("getAllMessage data", data);
  await API.callPostApiWithToken(messageUrlKey, obj, token)
    .then(res => res.json())
    .then(async res => {
      console.log("getAllMessage pass :", res);
      if (res.success == 1) {
        dispatch({
          type: GETALLMESSAGE,
          messageList: res.data
        });
        dispatch({
          type: LOADEROFF,
        });
      } else {
        dispatch({
          type: LOADEROFF,
        });
      }
    })
    .catch(err => {
      console.log(err);
      Alert.alert(
        "Error",
        "Somethings want wrong!" + err,
        [
          {
            text: "OK",
            onPress: () => {
              dispatch({
                type: LOADEROFF,
                // visible: false
              });
            }
          }
        ],
        { cancelable: false }
      );
    });
};

const getSendMessage = async (dispatch, data) => {
  const messageUrlKey = "create_message.php";
  var token = data.api_token;
  var obj = {
    ...data
  };
  console.log("OBJSEND", obj)
  await API.callPostApiWithToken(messageUrlKey, obj, token)
    .then(res => res.json())
    .then(async res => {
      console.log("getSendMessage pass :", res);
      if (res.success == 1) {
        Alert.alert(
          "Success",
          res.message,
          [
            {
              text: "OK",
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
      } else {
        console.log("getSendMessage pass false :", res);
      }
    })
    .catch(err => {
      Alert.alert(
        "Error",
        "Somethings want wrong!" + err,
        [
          {
            text: "OK",
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
    });
};
