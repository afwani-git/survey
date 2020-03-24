const passport = require("passport");
const GoogleStartegy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const config = require("config");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStartegy(
		{
			clientID: config.get("PASSPORT.googleClientId"),
			clientSecret: config.get("PASSPORT.googleClientSecret"),
			callbackURL: "/auth/google/callback"
		},
		(acessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(userExist => {
				if (userExist) {
					done(null, userExist);
				} else {
					new User({ googleId: profile.id }).save().then(user => {
						done(null, user);
					});
				}
			});
		}
	)
);
