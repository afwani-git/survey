import React from "react";
import reactDom from "react-dom";
//component
import App from "./components/App";
// redux
import { Provider } from "react-redux";
import store from "./redux/store";

reactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
