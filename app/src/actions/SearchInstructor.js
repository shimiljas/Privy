import { Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import API from "../common/ApiManager";
import { LOADEROFF, LOADERON, SERACHLIST, SELECTEDDATA,SELECT_CALENDER } from "./Types";

export const SearchInstructor = data => {
  return dispatch => {
    getSearchInstructor(dispatch, data);
  };
};
export const SelectedUser = data => {
  return dispatch => {
    setSelectedUser(dispatch, data);
  };
};
export const Booknow = data => {
  return dispatch => {
    setBooknow(dispatch, data);
  };
};
export const showCalendar = data => {
  return dispatch => {
    setCalendarData(dispatch, data);
  };
};

const setCalendarData = async (dispatch, data) => {
  dispatch({
    type: SELECT_CALENDER,
    selectedIndex: data
  });
};

const setBooknow = async (dispatch, data) => {
  dispatch({
    type: SELECTEDDATA,
    selectedUser: data
  });
  // Actions.BookNow({ type: "replace" });
};
const setSelectedUser = async (dispatch, data) => {
  dispatch({
    type: SELECTEDDATA,
    selectedUser: data
  });
  Actions.InstructorProfile({ type: "replace" });
};


const getSearchInstructor = async (dispatch, data) => {
  dispatch({
    type: LOADERON
  });
  const serachUrlKey = "getServiceProvidersList";
  // console.log("data getSearchInstructor", data.lessonType);
  var obj = {
    user_id: data.user_id,
    categoryId: data.categoryId,
    lat: "22.7545",
    long: "75.2454"
    // subCategoryId: data.subCategoryId,
    // lessonType: data.lessonType,
    // (data.startDate== 'Start Date'?null:startDate: data.startDate)
    // startDate: data.startDate,
    // fromTime: data.fromTime,
    // toTime: data.toTime,
    // daysRange: data.daysRange
  };
  if (data.subCategoryId != undefined) obj.subCategoryId = data.subCategoryId;
  if (data.lessonType != undefined) obj.lessonType = data.lessonType;
  if (data.startDate != "Start Date") obj.startDate = data.startDate;
  if (data.fromTime != "Start Time") obj.fromTime = data.fromTime;
  if (data.toTime != "End Time") obj.toTime = data.toTime;
  if (data.daysRange.length != 0) obj.daysRange = data.daysRange;

  var token = data.api_token;
  console.log(token, "getSearchInstructor data", obj);
  await API.callPostApiWithToken(serachUrlKey, obj, token)
    .then(res => res.json())
    .then(async res => {
      console.log("getSearchInstructor pass :", res);
      if (res.status == "true") {
        dispatch({
          type: SERACHLIST,
          searchedList: res.data
        });
        dispatch({
          type: LOADEROFF
        });
        Actions.InstructorList({ type: "replace", nm: "pppp" });
      } else {
        Alert.alert(
          "Sucess",
          res.message,
          [
            {
              text: "OK",
              onPress: () => {
                dispatch({
                  type: LOADEROFF
                  // visible: false
                });
              }
            }
          ],
          { cancelable: false }
        );
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
                type: LOADEROFF
                // visible: false
              });
            }
          }
        ],
        { cancelable: false }
      );
    });
};

export const searchedInsturctorWihCategory = obj => async dispatch => {
  await API.callPostApi("search_instructor_list.php", obj)
    .then(res => {
      console.log(res, "sdffd");
      if (res.success === 1) {
        res.data.instructors.map(item => {
          item["cat"] = res.data.cats;
        });
        dispatch({
          type: SERACHLIST,
          searchedList: res.data.instructors
        });
        dispatch({
          type: LOADEROFF
        });
        Actions.InstructorList({ type: "replace", data: res.data });
      }
    })

    .catch(err => {
      console.log(err);
    });
};
