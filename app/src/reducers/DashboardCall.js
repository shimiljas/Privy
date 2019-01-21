import { DASHBOARD } from "../actions/Types";

const INITIAL_STATE = {
    dashBoard: 'DashboardScreen',

};

export default (state = INITIAL_STATE, action) => {
    console.log("redux reducer dashborad", action.dashBoard);
    switch (action.type) {
        case DASHBOARD:
            return { 	...state,
                dashBoard: action.dashBoard };
        default:
            return { ...state };
    }
};
