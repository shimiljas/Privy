import { Actions } from "react-native-router-flux";
import { ALLCLASSES, LOADERON, LOADEROFF, SHOW_USER_DETAIL } from "./Types";
import API from "../common/ApiManager";
import { Alert } from "react-native";

const dashDefult = () => { };
export default dashDefult;

export const AllClasses = data => {
  return dispatch => {
    getAllClasses(dispatch, data);
  };
};

export const BookClass = data => {
  return dispatch => {
    BookClassByID(dispatch, data);
  };
};

export const cancelClasses = data => {
  return dispatch => {
    cancelClassesForId(dispatch, data);
  };
};

export const selectUser = user => {
  return dispatch => {
    selectUserWithIndex(dispatch, user);
  };
};

const selectUserWithIndex = (dispatch, user) => {
  dispatch({
    type: SHOW_USER_DETAIL,
    selectedUser: user
  });
}


const getAllClasses = async (dispatch, data) => {
  dispatch({
    type: ALLCLASSES,
    allClasses: []
  });

  const method = "get_booked_classes.php";
  console.log(method, "getAllClasses data", data);
  //changed on 6 december
  dispatch({ type: "STATE_CANCEL" });
  console.log("final booking obj == ");
  var token = data.api_token;
  await API.callPostApiWithToken(method, data, token)
    .then(res => res.json())
    .then(async res => {
      console.log(method, "getAllClasses ", res, data);
      if (res.success == 1) {
        console.log(method, "getAllClasses true", res.status);
        dispatch({
          type: ALLCLASSES,
          payload: res.data
        });
      } else {
        Alert.alert(
          "Error",
          res.message,
          [
            {
              text: "OK",
              onPress: () => {
                dispatch({
                  type: LOADEROFF
                });
              }
            }
          ],
          { cancelable: false }
        );
      }
    })
    .catch(res => {
      console.log("getAllClasses error wewr", res);
    });
};

const cancelClassesForId = async (dispatch, data) => {
  // dispatch({
  //   type: ALLCLASSES,
  //   allClasses: []
  // });
  console.log(data);

  const method = "cancel_class.php";

  //changed on 6 december
  dispatch({ type: "STATE_CANCEL" });
  var token = data.api_token;
  await API.callPostApiWithToken(method, data, token)
    .then(res => res.json())
    .then(async res => {
      console.log(method, "getAllClasses true", res);
      if (res.success == 1) {
        dispatch({ type: "CANCEL_CLASS", payload: data.bid });
      } else {
        Alert.alert(
          "Error",
          res.message,
          [
            {
              text: "OK",
              onPress: () => {
                dispatch({
                  type: LOADEROFF
                });
              }
            }
          ],
          { cancelable: false }
        );
      }
    })
    .catch(res => {
      console.log("getAllClasses error wewr", res);
    });
};

const BookClassByID = async (dispatch, data) => {
  // dispatch({
  //   type: ALLCLASSES,
  //   allClasses: []
  // });
  console.log(data);

  const method = "book_class.php";
  dispatch({ type: "STATE_CANCEL" });
  //changed on 6 december

  var token = data.api_token;
  await API.callPostApiWithToken(method, data, token)
    .then(res => res.json())
    .then(async res => {
      console.log(method, "getAllClasses true", res);
      if (res.success == 1) {
        alert(res.message);
        dispatch({ type: "BOOK_CLASS", payload: data.cid });
      } else {
        Alert.alert(
          "Error",
          res.message,
          [
            {
              text: "OK",
              onPress: () => {
                dispatch({
                  type: LOADEROFF
                });
              }
            }
          ],
          { cancelable: false }
        );
      }
    })
    .catch(res => {
      console.log("getAllClasses error wewr", res);
    });
};
