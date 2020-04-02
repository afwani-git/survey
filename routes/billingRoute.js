const config = require("config");
const stripe = require("stripe")(config.get("STRIPE.Secretkey"));
const isAuth = require("../middlewares/isAuth");

module.exports = app => {
	app.post("/api/stripe", isAuth, async (req, res) => {
		const charges = await stripe.charges.create({
			amount: 500,
			currency: "usd",
			description: "$5 for 5 email credits",
			source: req.body.id
		});

		req.user.credits += 5;
		const user = await req.user.save();
		res.json(user);
	});
};
