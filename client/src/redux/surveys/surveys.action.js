import axios from "axios";
import { FETCH_SURVEYS } from "./surveys.type";

export const fetchSurveys = () => async dispatch => {
	try {
		const req = await axios.get("/api/surveys");

		dispatch({
			type: FETCH_SURVEYS,
			payload: req.data
		});
	} catch (err) {
		console.log(err);
	}
};
