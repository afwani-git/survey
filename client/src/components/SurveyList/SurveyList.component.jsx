import React from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/surveys/surveys.action";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class SurveyList extends React.Component {
	componentDidMount() {
		this.props.fetchSurveys();
	}

	render() {
		const { surveys } = this.props;
		return (
			<React.Fragment>
				{surveys.map((data, i) => (
					<Card
						key={i}
						style={{
							minWidth: "275px",
							margin: "20px 0 20px 0"
						}}
					>
						<CardContent>
							<Typography variant={"h2"}>{data.title}</Typography>
							<Typography display="block" variant="subtitle1" component="p">
								{data.body}
							</Typography>
							<Typography align="left">
								Date sent:
								{data.dataSent
									? new Date(data.dataSent).toLocaleDateString()
									: new Date().toLocaleDateString()}
							</Typography>
						</CardContent>
						<CardActions>
							<Typography variant={"h5"} display="inline" color="textPrimary">
								YES:{data.yes}
							</Typography>
							<Typography variant={"h5"} display="inline" color="textPrimary">
								NO:{data.no}
							</Typography>
						</CardActions>
					</Card>
				))}
			</React.Fragment>
		);
	}
}

const stateToProps = ({ surveys }) => {
	return { surveys };
};

export default connect(stateToProps, actions)(SurveyList);
