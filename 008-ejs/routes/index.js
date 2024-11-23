const router = require('express').Router();
const fileMulter = require('../middleware/file');
const { db } = require('../constants');

const { Book } = require('../book');

router.get('/books', (req, res) => {
  const { books } = db;
  console.log(books)
  res.render('index', {
    title: 'Просмотр книг',
    books,
  });
});

router.get('/create', (req, res) => {
  res.render('book/create', {
    title: 'Добавить книгу',
    book: {},
    action: 'Добавить',
    deleteAction: '',
  });
});

router.post('/create',
  fileMulter.fields([
    {
      name: 'fileCover',
      maxCount: 1
    },
    {
      name: 'fileName',
      maxCount: 1
    }
  ]),
  (req, res) => {
    const {fileCover: [cover], fileName: [name]} = req.files;
    const { title, description, authors } = req.body;
    const coverPath = cover.path;
    const {path, originalname} = name;
    const book = new Book({
      title,
      description,
      authors,
      fileCover: coverPath,
      fileName: originalname,
      fileBook: path
    });
    db.books.push(book);
    res.redirect('/books');
});

router.get('/books/:id', (req, res) => {
  const { books } = db;
  const { id } = req.params;
  const idx = books.findIndex((book) => book.id === id);
  if (idx !== -1) {
    res.render('book/view', {
      title: 'Просмотр книги',
      book: books[idx],
    });
  } else {
    res.status(404).json('404 | страница не найдена');
  }
});

router.get('/books/update/:id', (req, res) => {
  const { books } = db;
  const { id } = req.params;
  const idx = books.findIndex((book) => book.id === id);
  if (idx !== -1) {
    res.render('book/update', {
      title: 'Редактировать',
      book: books[idx],
      action: 'Редактировать',
      deleteAction: 'Удалить'
    });
  } else {
    res.status(404).json('404 | страница не найдена');
  }
});

router.post('/books/delete/:id', (req, res) => {
  const { books } = db;
  const { id } = req.params;
  const idx = books.findIndex((book) => book.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
  }
  res.redirect('/books');
});

module.exports = router;
