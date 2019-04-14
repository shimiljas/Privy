import { SENDMESSAGE ,GETALLMESSAGE} from "../actions/Types";

const INITIAL_STATE = {
  visible: false,
  messageStatus: "",
  messageList:[]
};

export default (state = INITIAL_STATE, action) => {
  // console.log("redux reducer", action);
  switch (action.type) {
    case SENDMESSAGE:
      return { ...state, messageStatus: action.messageStatus };
    case GETALLMESSAGE:
      return { ...state, messageList: action.messageList };
    default:
      return { ...state };
  }
};
