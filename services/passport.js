const passport = require("passport");
const GoogleStartegy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const config = require("config");

const User = mongoose.model("users");

passport.use(
	new GoogleStartegy(
		{
			clientID: config.get("PASSPORT.googleClientId"),
			clientSecret: config.get("PASSPORT.googleClientSecret"),
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		async (acessToken, refreshToken, profile, done) => {
			const userExist = await User.findOne({ googleId: profile.id });

			if (userExist) {
				return done(null, userExist);
			}

			const user = new User({ googleId: profile.id }).save();
			return done(null, user);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});
