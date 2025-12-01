const router = require('express').Router();
const fileMulter = require('../middleware/file');
const { getCounter, incrementCounter } = require('../services/counter.service');

const BookService = require('../services/BookService');
const container = require('../containers/container');
const bookService = container.get(BookService);

router.get('/books', async (req, res) => {
  const books = await bookService.getBooks();

  res.render('books/index', {
    title: 'Просмотр книг',
    books,
    isAuthorized: !!req.user,
  });
});

router.get('/create', (req, res) => {
  res.render('books/create', {
    title: 'Добавить книгу',
    book: {},
    action: 'Добавить',
    deleteAction: '',
    isAuthorized: !!req.user,
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
    const { fileCover: [cover], fileName: [name] } = req.files;
    const { title, description, authors } = req.body;
    const coverPath = cover.path;
    const { path, originalname } = name;

    try {
      await bookService.createBook({
        title,
        description,
        authors,
        fileCover: coverPath,
        fileName: originalname,
        fileBook: path
      });

      res.redirect('/books');
    } catch {
      console.log('ошибка при сохранении')
    }
});

router.get('/books/:id', async (req, res) => {
	const { id } = req.params;
	const book = await bookService.getBook(id);
  if (book) {
    await incrementCounter(id);
    const counter = await getCounter(id);
    res.render('books/view', {
      title: 'Просмотр книги',
      book,
      counter: counter.data.value,
      isAuthorized: !!req.user,
    });
  } else {
    res.status(404).json('404 | страница не найдена');
  }
});

router.get('/books/update/:id', async (req, res) => {
	const { id } = req.params;
  
  try {    
    const book = await bookService.getBook(id);

    res.render('books/update', {
      title: 'Редактировать',
      book,
      action: 'Редактировать',
      deleteAction: 'Удалить',
      isAuthorized: !!req.user,
    });
  } catch (e) {
    res.status(404).json('404 | страница не найдена');
  }
});

router.post('/books/delete/:id', async (req, res) => {
	const { id } = req.params;
	const book = await bookService.getBook(id);

  try {
    if (book) {
      await bookService.deleteOne({ _id: id });
    }
    res.redirect('/books');
  } catch (e) {
    console.log('ошибка при удалении ', e)
  }
});

module.exports = router;
