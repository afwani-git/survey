const mongoose = require("mongoose");
const htmlToText = require("html-to-text");
const isAuth = require("../middlewares/isAuth");
const checkCerdits = require("../middlewares/checkCerdits");
const Mailler = require("../services/mailler");
const _ = require("lodash");
const pathParser = require("path-parser");
const { URL } = require("url");
const Surveys = mongoose.model("surveys");

module.exports = async app => {
	app.get("/api/surveys", isAuth, async (req, res) => {
		const surveys = await Surveys.find({ _user: req.user.id });
		res.json(surveys);
	});

	app.post("/api/webhook/survey/thanks", (req, res) => {
		const survey = _.chain(req.body)
			.map(req.body, ({ email, url }) => {
				const pathname = new URL(url).pathname;
				const patternUri = new pathParser(
					"/api/webhook/survey/:surveyId/:choice"
				);
				const match = patternUri.test(pathname);
				if (match) {
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			.compact()
			.uniqBy("email", "surveyId")
			.each(({ email, surveyId, choice }) => {
				Surveys.updateOne(
					{
						id: surveyId,
						recipients: {
							$elemMatch: {
								email: email,
								responded: false
							}
						}
					},
					{
						$inc: {
							[choice]: 1
						},
						$set: {
							"recipients.$.responded": true,
							lastRespon: new Date()
						}
					}
				).exec();
			})
			.value();

		console.log(req.body);
		res.send({});
	});

	app.post("/api/survey", isAuth, checkCerdits, (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Surveys({
			title,
			subject,
			body,
			recipients: req.body.recipients.split(",").map(email => ({ email })),
			_user: req.user.id, //temp
			dateSent: new Date()
		});

		const template = Mailler.templateMail(survey.body, survey._user);

		//setting``
		const emails = survey.recipients.map(mail => mail.email);
		const msg = {
			from: "no-reply@emaily.com",
			to: emails,
			title: survey.title,
			subject: survey.subject,
			html: template,
			text: htmlToText.fromString(template, { wordwrap: 130 })
		};

		const saveSurvery = survey.save();
		const sendMessage = Mailler.Mail.send(msg);

		req.user.credits--;
		const updataeCerdits = req.user.save();

		Promise.all([saveSurvery, sendMessage, updataeCerdits]).then(dat => {
			res.status(200).json(dat[2]);
		});
	});
};
