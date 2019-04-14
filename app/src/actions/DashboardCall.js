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
  // const method = data.roll_id == "2" ? "studentSummery" : "instructorSummery";
  const method = "get_dashboard_user.php"
  var obj = { user_id: data.user_id, roleId: data.role_id };
  var token = data.api_token;
  await API.callPostApiWithToken(method, obj, token)
    .then(res => res.json())
    .then(async res => {
      if (res.success == 1) {
        dispatch({
          type: DASHBOARD,
          dashBoard: res.data
        });
      }
    })
    .catch(res => {
      console.log("Dashboard status error", res.message);
    });
};
