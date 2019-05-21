import { ALLCLASSES } from "../actions/Types";

const INITIAL_STATE = {
  allClasses: [],
  changed: false
};

export default (state = INITIAL_STATE, action) => {
  // console.log("redux reducer", action);
  switch (action.type) {
    case ALLCLASSES:
      return { ...state, allClasses: action.payload };
    case "STATE_CANCEL":
      return { ...state, changed: false };
    case "CANCEL_CLASS":
      console.log(action.payload, "action.payloadaction.payload");
      const index = state.allClasses.findIndex(x => x.bid == action.payload);
      console.log(index);
      state.allClasses[index].cancel = 1;

      return { ...state, changed: true };

    case "BOOK_CLASS":
      console.log(action.payload, "action.payloadaction.payload");
      const dupindex = state.allClasses.findIndex(x => x.cid == action.payload);
      console.log(dupindex);
      state.allClasses[dupindex].cancel = 0;

      return { ...state, changed: true };

    default:
      return { ...state };
  }
};
