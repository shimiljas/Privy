import { Actions } from "react-native-router-flux";
import { ALLCLASSES, LOADERON, LOADEROFF } from "./Types";
import API from "../common/ApiManager";
import { Alert } from "react-native";

const dashDefult = () => {};
export default dashDefult;

export const AllClasses = data => {
  return dispatch => {
    getAllClasses(dispatch, data);
  };
};

const getAllClasses = async (dispatch, data) => {
  dispatch({
    type: ALLCLASSES,
    allClasses: undefined
  });
  dispatch({
    type: LOADERON,
  });
  const method = "get_classes_ins.php";
  console.log(method, "getAllClasses data", data.api_token);
  //changed on 6 december
  var obj = { user_id: 6, status: data.status  };
  console.log("final booking obj == ",obj);
  var token = data.api_token;
   await API.callPostApiWithToken(method, obj, token)
    .then(res => res.json())
    .then(async res => {
      console.log(method, "getAllClasses ", res);
      if (res.status == "true") {
        console.log(method, "getAllClasses true", res.status);
        dispatch({
          type: ALLCLASSES,
          allClasses: res.data
        });
      } else if(res.code == 405) {
        Alert.alert(
          "Error",
          res.message,
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
      else{
        dispatch({
          type: LOADEROFF,
        });
        console.log("getAllClasses error", res.status);
      }
    })
    .then(()=>{
      console.log("vishesh here..")
      
    })
    .catch(res => {
      console.log("getAllClasses error wewr", res);
    });
};
