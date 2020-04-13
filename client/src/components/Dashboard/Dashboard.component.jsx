import React from "react";

import FormDialog from "../FormDialog/FormDialog.component";
import { StylesProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { AddButton } from "./Dashboard.style";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import SurveyList from "../SurveyList/SurveyList.component";

import * as actions from "../../redux/auth/auth.action";
import { connect } from "react-redux";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dialogIsOpen: false,
			snackBarIsOpen: false
		};

		this.closeDialog = this.closeDialog.bind(this);
		this.openDialog = this.openDialog.bind(this);
		this.handelSubmit = this.handelSubmit.bind(this);
	}

	handelSubmit(data) {
		this.props.makeSurvey(data);
		this.setState({
			dialogIsOpen: false,
			snackBarIsOpen: true
		});
	}

	closeDialog() {
		this.setState({
			dialogIsOpen: false
		});
	}

	openDialog() {
		this.setState({
			dialogIsOpen: true
		});
	}

	render() {
		return (
			<div>
				<SurveyList />
				<StylesProvider injectFirst>
					<AddButton
						aria-label="add"
						color="primary"
						onClick={() => this.openDialog()}
					>
						<AddIcon />
					</AddButton>
					<FormDialog
						isOpen={this.state.dialogIsOpen}
						handleClose={this.closeDialog}
						handelSubmit={this.handelSubmit}
					/>
				</StylesProvider>
				{/* snackbar  feedback*/}
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
					open={this.snackBarIsOpen}
					autoHideDuration={6000}
					onClose={() => this.setState({ snackBarIsOpen: false })}
					message="Note archived"
					action={
						<React.Fragment>
							<Button
								color="secondary"
								size="small"
								onClick={() => this.setState({ snackBarIsOpen: false })}
							>
								Exit
							</Button>
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={() => this.setState({ snackBarIsOpen: false })}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</React.Fragment>
					}
				/>
			</div>
		);
	}
}

export default connect(null, actions)(Dashboard);
