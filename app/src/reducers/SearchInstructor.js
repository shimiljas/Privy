import { SERACHLIST, SELECTEDDATA } from "../actions/Types";

const INITIAL_STATE = {
  searchedList: [],
  selectedUser: {}
  // error: ""
};
export default (state = INITIAL_STATE, action) => {
  // console.log("redux reducer", action);
  switch (action.type) {
    case SERACHLIST:
      return {
        ...state,
        searchedList: action.searchedList
      };
    case SELECTEDDATA:
      return {
        ...state,
        selectedUser: action.selectedUser
      };
    default:
      return { ...state };
  }
};
