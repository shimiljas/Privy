import { Alert } from "react-native";
import { SENDREVIEWS, LOADEROFF, SENDAPPROVEREVIEW,LOADERON, ALLPENDINGREVIEWS,ALLAPPROVEREVIEWS } from "./Types";
import API from "../common/ApiManager";
import Util from "../common/Util";
import Color from "../common/Color";
import clientApi from "../common/ApiManager";

export const SendReview = data => {
  return dispatch => {
    getSendReview(dispatch, data);
  };
};

export const AllReview = data => {
  return dispatch => {
    getAllReview(dispatch, data);
  };
};
export const SendApprovedReview = data => {
    return dispatch => {
      getSendApprovedReview(dispatch, data);
    };
  };

  const getSendApprovedReview = async (dispatch, data) => {
    // dispatch({
    //   type: LOADERON,
    //   visible: false
    // });
    const messageUrlKey = "approveReview";
    var token = data.api_token;
    var obj = {
      user_id: data.user_id,
      review_id: data.review_id,
    };
    console.log("getSendApprovedReview data", data);
    await API.callPostApiWithToken(messageUrlKey, obj, token)
      .then(res => res.json())
      .then(async res => {
        console.log("getSendApprovedReview pass :", res);
        if (res.success == 1) {
          dispatch({
            type: SENDAPPROVEREVIEW,
            reviewApproveStatus: res.data
          });
          dispatch({
            type: LOADEROFF,
            visible: false
          });
        } else {
          Util.ShowToast(res.message, 2000, Color.whiteClr, Color.red);
          dispatch({
            type: LOADEROFF,
            visible: false
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
                  visible: false
                });
              }
            }
          ],
          { cancelable: false }
        );
      });
  };
  
const getAllReview = async (dispatch, data) => {
  // dispatch({
  //   type: LOADERON,
  //   visible: false
  // });
  const reviewUrlKey = "get_reviews.php";
  var token = data.token;
  
  console.log("getAllReviews data", data);
  await clientApi.callApi(
       "get_reviews.php",
       data,
      token
     )
    .then( response => {
      const approvedReviews = [];
      const pendingReviews = [];
      if (response.success == 1) {
        reviews = response.data;
        for (let review of reviews) {
          if (review.approve == 1) {
            approvedReviews.push(review);
          } else {
            pendingReviews.push(review);
          }
        }

         dispatch({
                   type: ALLAPPROVEREVIEWS,
                  reviewApproveList: approvedReviews
           });
          dispatch({
               type: ALLPENDINGREVIEWS,
                reviewPendingList: pendingReviews
              });

      // if (res.status == "true") {
      //     if (data.status == 1) {
      //       dispatch({
      //           type: ALLAPPROVEREVIEWS,
      //           reviewApproveList: res.data
      //         });
      //     }
      //     else if (data.status == 0){
      //       dispatch({
      //           type: ALLPENDINGREVIEWS,
      //           reviewPendingList: res.data
      //         });
      //     }
       
        dispatch({
          type: LOADEROFF,
          visible: false
        });
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

const getSendReview = async (dispatch, data) => {
  // dispatch({
  //   type: LOADERON,
  //   visible: false
  // });
  const messageUrlKey = "sendReview";
  var token = data.api_token;
  var obj = {
    user_id: data.user_id,
    booking_id: data.booking_id,
    answer1: data.answer1,
    answer2: data.answer2,
    answer3: data.answer3,
    classId: data.classId,
    rating: data.rating
  };
  console.log("getSendReview data", data);
  await API.callPostApiWithToken(messageUrlKey, obj, token)
    .then(res => res.json())
    .then(async res => {
      console.log("getSendReview pass :", res);
      if (res.status == "true") {
        dispatch({
          type: SENDREVIEWS,
          reviewStatus: res.data
        });
        dispatch({
          type: LOADEROFF,
          visible: false
        });
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
