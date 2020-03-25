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

//services
require("./services/passport");

// sessions
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [config.get("PASSPORT.cookieKey")]
	})
);

app.use(passport.initialize());
app.use(passport.session());

// route
require("./routes/authRoute")(app);

const CALLBACK_SERVER = () => {
	console.log(`listen on ${PORT} 💻`);
	console.log(config.get("status"));
};

const PORT = config.get("SERVER.PORT") || 5000;

app.listen(PORT, CALLBACK_SERVER);
