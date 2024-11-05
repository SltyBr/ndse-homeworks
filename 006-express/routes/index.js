const router = require('express').Router();
const fileMulter = require('../middleware/file');
const { db, credentials, apiKey } = require('../constants');

const { Book } = require('../book');

router.post(`${apiKey}/user/login`, (req, res) => {
  res.status(201);
  res.json(credentials);
});

router.post(`${apiKey}/books`,
  fileMulter.single('book'),
  (req, res) => {
    if (req.file) {
      const { books } = db;
      const { title, desc } = req.body;
      const path = req.file.path
      const newBook = new Book(title, desc, path);
      console.log(path)
      books.push(newBook);

      res.status(201).json(newBook);
    }
    res.json();
});

router.get(`${apiKey}/books`, (req, res) => {
  const { books } = db;
  res.json(books);
});

router.get(`${apiKey}/books/:id`, (req, res) => {
  const { books } = db;
  const { id } = req.params;
  const idx = books.findIndex((book) => book.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404).json('404 | страница не найдена');
  }
});

router.delete(`${apiKey}/books/:id`, (req, res) => {
  const { books } = db;
  const { id } = req.params;
  const idx = books.findIndex((book) => book.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json('ok');
  } else {
    res.status(404).json('404 | страница не найдена');
  }
});

module.exports = router;
