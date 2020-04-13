import React from "react";
import TextField from "@material-ui/core/TextField";

const InputMaterial = props => {
	return (
		<React.Fragment>
			<TextField {...props.field} {...props} />
		</React.Fragment>
	);
};

export default InputMaterial;
