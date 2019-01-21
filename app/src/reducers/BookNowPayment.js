import { PAYPALTOKEN,BOOKEDID, BOOKEDSTATUS } from "../actions/Types";

const INITIAL_STATE = {
  Paypaltoken: '',
  bookingId:'',
  bookingStatus: false,

};

export default (state = INITIAL_STATE, action) => {
  // console.log("redux reducer", action);
  switch (action.type) {
    case PAYPALTOKEN:
      return { ...state, Paypaltoken: action.Paypaltoken };
      case BOOKEDID:
      return { ...state, bookingId: action.bookingId };
      case BOOKEDSTATUS:
      return { ...state, bookingStatus: action.bookingStatus };
    default:
      return { ...state };
  }
};
