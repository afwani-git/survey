import React from "react";
import StripeCheckout from "react-stripe-checkout";
import Button from "@material-ui/core/Button";

// redux
import * as action from "../../redux/auth/auth.action";
import { connect } from "react-redux";

class Payment extends React.Component {
	render() {
		return (
			<StripeCheckout
				name="emaily"
				description="5$ for 5 email credits"
				amount={500}
				token={token => this.props.handleToken(token.id)}
				stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
			>
				<Button
					style={{
						color: "white",
						border: "1px solid white",
						margin: "0 5px 0 5px",
						cursor: "pointer"
					}}
				>
					purches credits
				</Button>
			</StripeCheckout>
		);
	}
}

export default connect(null, action)(Payment);
