import { LOADERON, LOADEROFF } from "./Types";

export const LoaderStatusOn = () => {
	return dispatch => {
		loaderStatusOn(dispatch);
	};
};
export const LoaderStatusOff = () => {
	return dispatch => {
		loaderStatusOff(dispatch);
	};
};
const loaderStatusOn = async dispatch => {
	dispatch({
		type: LOADERON
	});
};
const loaderStatusOff = async dispatch => {
	dispatch({
		type: LOADEROFF
	});
};
