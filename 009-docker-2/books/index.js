const express = require('express');
const mongoose = require('mongoose');
const expressSession = require("express-session");
const passport = require("./middleware/passport");

const app = express();
const error404 = require('./middleware/err-404');
const booksRouter = require('./routes/books');
const userRouter = require('./routes/user');

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(expressSession({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', booksRouter);
app.use('/user', userRouter);
app.use('/public', express.static(__dirname + '/public'));
app.use(error404);

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

(async ()=> {
	try {
		await mongoose.connect(`${DB_URL}${DB_NAME}`);
		console.log('успешное подключение к бд');
	} catch (e) {
		console.log('Ошибка подключения Базы данных ', e);
	}
})();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
