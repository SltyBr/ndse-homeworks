const express = require('express');

const app = express();
const error404 = require('./middleware/err-404');
const indexRouter = require('./routes/index');

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/public', express.static(__dirname + '/public'))

app.use(error404);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
