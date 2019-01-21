import {
  USERAUTH,
  FORMCHANGE,
  PASSFORMCHNAGE,
  MODELPASSWORD
} from "../actions/Types";

const INITIAL_STATE = {
  userdata: "",
  successData: false,
  passFromchange: false,
  ModelVisible: false,
  message: ""

  // error: ""
};
export default (state = INITIAL_STATE, action) => {
  // console.log("redux reducer", action);
  switch (action.type) {
    case USERAUTH:
      return {
        ...state,
        userdata: action.payload
      };
    case PASSFORMCHNAGE:
      return {
        ...state,
        passFromchange: action.passform
      };
    case MODELPASSWORD:
      return {
        ...state,
        ModelVisible: action.ModelVisible,
        message: action.message
      };
    case FORMCHANGE:
      return {
        ...state,
        successData: action.successData
      };

    // case ERROR:
    // 	return { ...state, error: action.errorMsg };
    default:
      return { ...state };
  }
};
