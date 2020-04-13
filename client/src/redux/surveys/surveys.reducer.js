import { FETCH_SURVEYS } from "./surveys.type";

const INITIAL_STATE = [];

const surveysReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_SURVEYS:
			return action.payload;
		default:
			return state;
	}
};

export default surveysReducer;
