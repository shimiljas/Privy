import { LOADEROFF, LOADERON } from "../actions/Types";

const INITIAL_STATE = {
    visible: false
};

export default (state = INITIAL_STATE, action) => {
    console.log("redux reducer", action);
    switch (action.type) {
        case LOADERON:
        // console.log("turning on the loader", action.visible)
            return { visible: true };
        case LOADEROFF:
            return { visible: false };
        default:
            return { ...state };
    }
};
