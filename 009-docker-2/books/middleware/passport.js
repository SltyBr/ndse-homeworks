const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use('local', new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, async (username, password, done) => {
	try {
		const user = await User.findOne({ username });

		if (!user) {
			return done(null, false, { message: 'Пользователь не найден' });
		}
		
		if (user.password !== password) {
			return done(null, false);
		}

		return done(null, user);
	} catch (error) {
		return done(error);
	}
}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		done(error);
	}
});


module.exports = passport;