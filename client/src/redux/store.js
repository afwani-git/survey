import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./rootReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

// default
let middlewares = [thunk];
let devTools = f => f;

if (process.env.NODE_ENV !== "production") {
	middlewares.push(logger);
	devTools =
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(
	rootReducer,
	{},
	compose(applyMiddleware(...middlewares), devTools)
);

export default store;
