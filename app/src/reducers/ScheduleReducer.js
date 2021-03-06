import { SCHEDULES, FORMCHANGE, SCHEDULE, APIRESPONSE } from "../actions/Types";

const INITIAL_STATE = {
  schedules: "",
  successData: false,
  schedule: "",
  loader: false
};
export default (state = INITIAL_STATE, action) => {
  // console.log("redux reducer", action);
  switch (action.type) {
    case SCHEDULES:
      return {
        ...state,
        schedules: action.payload
      };
    case SCHEDULE:
      return {
        ...state,
        schedule: action.payload
      };
    case FORMCHANGE:
      return {
        ...state,
        successData: action.successData,
        loader: true
      };
    case APIRESPONSE:
      return {
        ...state,
        response: action.payload,
        loader: false
      };

    // case ERROR:
    // 	return { ...state, error: action.errorMsg };
    default:
      return { ...state };
  }
};
