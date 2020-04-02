import React from "react";
import { withRouter } from "react-router-dom";
import { HeaderTop } from "./Header.style";
import Payment from "../Payment/Payment.component";

import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { StylesProvider } from "@material-ui/core/styles";

// redux
import { connect } from "react-redux";

class Header extends React.Component {
	renderTemplate() {
		switch (this.props.auth.data) {
			case null:
				return <CircularProgress thickness={2} style={{ color: "white" }} />;
			case false:
				return (
					<div className="nav">
						<Button href="/api/auth/google" className="button">
							Login
						</Button>
					</div>
				);
			default:
				return (
					<div className="nav">
						<Typography
							varinat="h3"
							style={{
								margin: "0 10px 0 10px",
								color: "white"
							}}
						>
							credits : {this.props.auth.data.credits}
						</Typography>
						<Payment />
						<Button href="/api/auth/logout" className="button">
							Logout
						</Button>
					</div>
				);
		}
	}

	render() {
		const { history, auth } = this.props;
		return (
			<StylesProvider injectFirst>
				<HeaderTop position="static">
					<Toolbar className="toolbar">
						<IconButton
							className="menu"
							edge="start"
							color="inherit"
							aria-label="menu"
						>
							<MenuIcon />
						</IconButton>
						<Typography
							onClick={() => history.push(auth.data ? "/survey" : "/")}
							className="title"
						>
							Emaily
						</Typography>
						{this.renderTemplate()}
					</Toolbar>
				</HeaderTop>
			</StylesProvider>
		);
	}
}

const mapsStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapsStateToProps)(withRouter(Header));
