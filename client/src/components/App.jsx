import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./header/Header.component";
import Landing from "./Landing/Landing.component";
import Dashboard from "./Dashboard/Dashboard.component";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";

// redux
import { connect } from "react-redux";
import * as actions from "../redux/auth/auth.action";

class App extends React.Component {
	componentDidMount() {
		window.axios = axios;

		this.props.fetchUser();
	}

	render() {
		return (
			<BrowserRouter>
				{/*==like normalize css=*/}
				<CssBaseline />
				{/* ==================== */}
				<Container fixed>
					<Header />
					<Route path="/" component={Landing} />
					<Route path="/surveys" component={Dashboard} />
				</Container>
			</BrowserRouter>
		);
	}
}

export default connect(null, actions)(App);
