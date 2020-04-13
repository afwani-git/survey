const Mail = require("@sendgrid/mail");
const config = require("config");

const MAILER_API_KEY = config.get("emailGridKey");
const REDIRECT_URI = config.get("redirectURI");

Mail.setApiKey(MAILER_API_KEY);

const templateMail = ({ body, id }) => {
	return `
	<html>
		<body>
			<div style="text-align:center;">
				<h3>I'd like your input!</h3>
				<p>${body}</p>
				<div>
					<a href="${REDIRECT_URI}api/webhook/survey/${id}/yes">yes</a>
				</div>
				<div>
					<a href="${REDIRECT_URI}api/webhook/survey/${id}/no">yes</a>
				</div>
				<div>
				</div>
			</div>
		</body>
	</html>
	`;
};

module.exports = {
	Mail,
	templateMail
};
