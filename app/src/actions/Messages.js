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
  const messageUrlKey = "getAllMessages";
  var token = data.api_token;
  var obj = {
    user_id: data.user_id
  };
  console.log("getAllMessage data", data);
  await API.callPostApiWithToken(messageUrlKey, obj, token)
    .then(res => res.json())
    .then(async res => {
      console.log("getAllMessage pass :", res);
      if (res.status == "true") {
        dispatch({
          type: GETALLMESSAGE,
          messageList: res.data
        });
        dispatch({
          type: LOADEROFF,
          // visible: false
        });
      } else {
        dispatch({
          type: LOADEROFF,
          // visible: false
        });
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
  const messageUrlKey = "sendMessage";
  var token = data.api_token;
  var obj = {
    user_id: data.user_id,
    reciever_id: data.reciever_id,
    content: data.content
  };
  console.log("getSendMessage data", data);
  await API.callPostApiWithToken(messageUrlKey, obj, token)
    .then(res => res.json())
    .then(async res => {
      console.log("getSendMessage pass :", res);
      if (res.status == "true") {
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
