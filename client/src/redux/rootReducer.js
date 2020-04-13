import { combineReducers } from "redux";
//all reducer
import authReducer from "./auth/auth.reducer";
import surveysReducer from "./surveys/surveys.reducer";

const rootReducer = combineReducers({
	auth: authReducer,
	surveys: surveysReducer
});

export default rootReducer;
