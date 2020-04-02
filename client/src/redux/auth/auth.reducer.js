import { FETCH_USER } from "./auth.type";

const INITIAL_STATE = {
	data: null
};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_USER:
			return {
				...state,
				data: action.payload || false
			};
		default:
			return state;
	}
}
