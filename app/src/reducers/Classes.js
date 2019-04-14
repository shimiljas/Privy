import { ALLCLASSES } from "../actions/Types";

const INITIAL_STATE = {
    allClasses: undefined,
};

export default (state = INITIAL_STATE, action) => {
    // console.log("redux reducer", action);
    switch (action.type) {
        case ALLCLASSES:
            return { 	...state,
                allClasses: action.allClasses };
        default:
            return { ...state };
    }
};
