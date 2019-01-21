import { Actions } from "react-native-router-flux";
import { DASHBOARD } from "./Types";
import API from "../common/ApiManager";

const dashDefult=()=>{

}
export default  dashDefult 
export const deshBoardValue = data => {
  return dispatch => {
    getDeshBoardValue(dispatch, data);
  };
};
export const deshHomeValue = data => {
  return dispatch => {
    getDeshHomeValue(dispatch, data);
  };
};

const getDeshHomeValue = async (dispatch,data) => {
  console.log("dashboard change",data)
  dispatch({
    type: DASHBOARD,
    dashBoard: data
  });
  Actions.Dashboard({ type: "replace" })
};

const getDeshBoardValue = async (dispatch, data) => {
  const method = data.roll_id == "2" ? "studentSummery" : "instructorSummery";
  var obj = { user_id: data.user_id };
  var token = data.api_token;
  await API.callPostApiWithToken(method, obj, token)
    .then(res => res.json())
    .then(async res => {
      console.log(method, "get user data Dashboard ", res);
      if (res.status == "true") {
        console.log(method, "Dashboard staus", res.status);
        dispatch({
          type: DASHBOARD,
          dashBoard: res.data
        });
      } else {
        console.log("Dashboard staus asdas", res.status);
      }
    })
    .catch(res => {
      console.log("Dashboard staus error", res.status);
    });
};
