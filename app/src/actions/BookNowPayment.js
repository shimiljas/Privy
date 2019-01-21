import { Actions } from "react-native-router-flux";
import { Alert } from "react-native";
import { PAYPALTOKEN, LOADEROFF, LOADERON,BOOKEDID, BOOKEDSTATUS } from "./Types";
import {
  PaypalTokenUrl,
  PayForBookingUrl,
  BookClass
} from "../common/AppSettings";
import API from "../common/ApiManager";

export const BookNowClass = data => {
  return dispatch => {
    setBookNowClass(dispatch, data);
  };
};

export const PaypalToken = () => {
  return dispatch => {
    getPaypalToken(dispatch);
  };
};

export const PayForBooking = (data) => {
  return dispatch => {
    getPayForBooking(dispatch,data);
  };
};
const setBookNowClass = async (dispatch, data) => {
  dispatch({
    type: LOADERON,
  });
  console.log("data", data);
  var obj = {
    user_id: data.user_id,
    classId: data.classId,
    from_time: data.from_time,
    to_time: data.to_time,
    actualPrice: data.actualPrice,
    payedPrice: data.payedPrice,
    classdate: data.classdate
  };
  var token = data.api_token;
  console.log(token, "setBookNowClass data", obj);
  await API.callPostApiWithToken(BookClass, obj, token)
    .then(res => res.json())
    .then(async res => {
      console.log("setBookNowClass pass :", res);
      if (res.status == "true") {
       
        if (res.data != undefined) {
          dispatch({
            type: BOOKEDID,
            bookingId: res.data._id
          });
          dispatch({
            type: LOADEROFF,
          });
          getPaypalToken(dispatch);
        } else{
           Alert.alert(
          "Error",
          'Internal server error',
          [
            {
              text: "OK",
              onPress: () => {
                dispatch({
                  type: LOADEROFF,
                });
              }
            }
          ],
          { cancelable: false }
        );
    
        }
        
       
      
      } else {
        dispatch({
          type: LOADEROFF,
          visible: false
        });
      }
    })
    .catch(err => {
      Alert.alert(
        "Error",
        "Somethings went wrong!" + err,
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
const getPayForBooking = async (dispatch, data) => {
  // dispatch({
  //   type: LOADERON,
  //   visible: true
  // });
  var token = data.api_token;
  var obj = {
    user_id: data.user_id,
    amount: data.amount,
    booking_id: data.booking_id,
    paymentMethodNonce: data.paymentMethodNonce
  };
  console.log("getPayForBooking data", data);
  await API.callPostApiWithToken(PayForBookingUrl, obj, token)
    .then(res => res.json())
    .then(async res => {
      console.log("getPayForBooking pass :", res);
      if (res.status == "true") {
        dispatch({
          type: LOADEROFF,
          visible: false
        });
        dispatch({
          type: BOOKEDSTATUS,
          bookingStatus: true
        });
        // Alert.alert(
        //   "Success",
        //   res.message,
        //   [
        //     {
        //       text: "OK",
        //       onPress: () => {
        //         dispatch({
        //           type: LOADEROFF,
        //           visible: false
        //         });
        //       }
        //     }
        //   ],
        //   { cancelable: false }
        // );
      } else {
        console.log("getPayForBooking pass false :", res);
      }
    })
    .catch(err => {
      Alert.alert(
        "Error",
        "Somethings went wrong!" + err,
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

const getPaypalToken =  async dispatch => {
  // dispatch({
  //   type: LOADERON,
  //   visible: true
  // });
  await API.callGetApi(PaypalTokenUrl)
    .then(res => {
      console.log(PaypalTokenUrl, "getPaypalToken ", res);
      if (res.status == "true") {
        console.log(PaypalTokenUrl, "getPaypalToken true", res.status);
        dispatch({
          type: PAYPALTOKEN,
          Paypaltoken: res.data.token
        });
        dispatch({
          type: LOADEROFF,
          visible: false
        });
        Actions.Pay({ type: "replace" });
      } else {
        dispatch({
          type: LOADEROFF,
          visible: false
        });
        console.log("getPaypalToken error", res.status);
      }
    })
    .catch(res => {
      console.log("getPaypalToken error wewr", res);
    });
};
