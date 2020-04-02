import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Landing = props => {
	return (
		<Box style={{ textAlign: "center", marginTop: "20px" }}>
			<Typography variant="h2" component={Box}>
				Emaily !!
			</Typography>
			<Typography component={"span"} variant={"body2"}>
				Collect FeedBack from user
			</Typography>
		</Box>
	);
};

export default Landing;
