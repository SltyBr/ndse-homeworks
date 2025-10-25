const router = require('express').Router();
const fileMulter = require('../middleware/file');
const { getCounter, incrementCounter } = require('../services/counter.service');
const Book = require("../models/Book");

router.get('/books', async (req, res) => {
  const books = await Book.find();
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
  async (req, res) => {
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

    try {
      await book.save();
      res.redirect('/books');
    } catch {
      console.log('ошибка при сохранении')
    }
});

router.get('/books/:id', async (req, res) => {
	const { id } = req.params;
	const book = await Book.findById(id);
  if (book) {
    await incrementCounter(id);
    const counter = await getCounter(id);
    res.render('book/view', {
      title: 'Просмотр книги',
      book,
      counter: counter.data.value,
    });
  } else {
    res.status(404).json('404 | страница не найдена');
  }
});

router.get('/books/update/:id', async (req, res) => {
	const { id } = req.params;
  
  try {    
    const book = await Book.findById(id);

    res.render('book/update', {
      title: 'Редактировать',
      book,
      action: 'Редактировать',
      deleteAction: 'Удалить'
    });
  } catch (e) {
    res.status(404).json('404 | страница не найдена');
  }
});

router.post('/books/delete/:id', async (req, res) => {
	const { id } = req.params;
	const book = await Book.findById(id);

  try {
    if (book) {
      await Book.deleteOne({ _id: id });
    }
    res.redirect('/books');
  } catch (e) {
    console.log('ошибка при удалении ', e)
  }
});

module.exports = router;
