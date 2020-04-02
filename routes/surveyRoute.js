const mongoose = require("mongoose");
const isAuth = require("../middlewares/isAuth");
const checkCerdits = require("../middlewares/checkCerdits");

const Surveys = mongoose.model("surveys");

module.exports = app => {
	app.post("/api/survey", isAuth, checkCerdits, (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Surveys({
			title,
			subject,
			body,
			recipients: req.body.recipients.split(",").map(email => ({ email }))
		});

		res.status(200).json(survey);
	});
};
