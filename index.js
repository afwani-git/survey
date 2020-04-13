const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("config");
const cookieSession = require("cookie-session");
const app = express();

//database
mongoose
	.connect(config.get("DB.mongoURI"), {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: config.get("DB.DBName")
	})
	.catch(err => console.log(err));

// models
require("./models/User");
require("./models/Surveys");

//services
require("./services/passport");
require("./services/tunnel");

// sessions
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [config.get("PASSPORT.cookieKey")]
	})
);

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "localhost"); // update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	return next();
});

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// route
require("./routes/authRoute")(app);
require("./routes/billingRoute")(app);
require("./routes/surveyRoute")(app);

const CALLBACK_SERVER = () => {
	console.log(`listen on ${PORT} 💻`);
	console.log(config.get("status"));
};

const PORT = config.get("SERVER.PORT") || 5000;

app.listen(PORT, CALLBACK_SERVER);
