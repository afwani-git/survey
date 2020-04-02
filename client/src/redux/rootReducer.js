import { combineReducers } from "redux";
//all reducer
import authReducer from "./auth/auth.reducer";

const rootReducer = combineReducers({
	auth: authReducer
});

export default rootReducer;
