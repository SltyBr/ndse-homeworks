const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/login', (_req, res) => {
	res.render('user/index', {
		title: 'Войти',
    action: 'login',
    actionBtn: 'Войти',
	});
});

router.post(
	'/login',
	passport.authenticate('local'),
	(req, res) => {
		res.redirect('/books');
	}
);

router.get('/signup', (_req, res) => {
	res.render('user/index', {
    title: 'Зарегистрироваться',
    action: 'signup',
    actionBtn: 'Зарегистрироваться'
  });
});

router.post('/signup', async (req, res) => {
	const { username, password } = req.body;
  try {
    const user = new User({
      username,
      password
    });

    await user.save();

    res.redirect('/books');
  } catch (e) {
    console.error(e);
  }
});

router.get(
	'/me',
	(req, res, next) => {
		if (!req.isAuthenticated || !req.isAuthenticated()) {
			if (req.session) {
				req.session.returnTo = req.originalUrl || req.url;
			}
			return res.redirect('/books');
		}
		next();
	},
	(req, res) => {
		res.render('user/profile', { user: req.user, title: 'Личный кабинет' });
	}
);

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
