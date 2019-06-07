import { SERACHLIST, SELECTEDDATA, SELECT_CALENDER } from "../actions/Types";

const INITIAL_STATE = {
  searchedList: [],
  selectedUser: {},
  calenderSelectionIndex: -1
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
    case SELECT_CALENDER:
      return {
        ...state,
        calenderSelectionIndex: action.selectedIndex
      };
    default:
      return { ...state };
  }
};
