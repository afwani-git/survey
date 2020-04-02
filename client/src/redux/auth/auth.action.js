import axios from "axios";
import { FETCH_USER } from "./auth.type";

export const fetchUser = () => async dispatch => {
	const { data } = await axios.get("/api/auth/current_user");

	dispatch({ type: FETCH_USER, payload: data });
};

export const handleToken = id => async dispatch => {
	try {
		const { data } = await axios.post("/api/stripe", { id });
		dispatch({ type: FETCH_USER, payload: data });
	} catch (err) {
		console.log(err);
	}
};
