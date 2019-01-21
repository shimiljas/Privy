import { combineReducers } from "redux";
import User from "./UserReducer";
import Loader from "./LoaderStatus";
import DashboardCall from "./DashboardCall";
import Schedule from "./ScheduleReducer";
import SearchIntructor from "./SearchInstructor";
import AllClasses from "./Classes";
import AllMessages from './Messages';
import AllReviews from './Reviews';
import Payment from './BookNowPayment';

export default combineReducers({
    User,
    Loader,
    DashboardCall,
    Schedule,
    SearchIntructor,
    AllClasses,
    AllMessages,
    AllReviews,
    Payment
});
