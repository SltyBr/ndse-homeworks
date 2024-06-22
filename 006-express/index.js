const express = require('express');
const { v4: uuid } = require('uuid');

const creds = { id: 1, mail: "test@mail.ru" };

class Book {
  constructor(title = '', desc = '', id = uuid()) {
    this.id = id;
    this.title = title;
    this.description = desc;
    this.authors = '';
    this.favorite = '';
    this.fileCover = '';
    this.fileName = '';
  }
}

const db = {
  books: [
    new Book('test', 'my test'),
    new Book('test1', 'my test1'),
    new Book('test2', 'my test2'),
  ],
};

const app = express();
app.use(express.json());

app.post('/api/user/login', (req, res) => {
  res.status(201);
  res.json(creds)
})

app.post('/api/books', (req, res) => {
  const { books } = db;
  const { title, desc } = req.body;

  const newBook = new Book(title, desc);
  books.push(newBook);

  res.status(201).json(newBook)
});

app.get('/api/books', (req, res) => {
  const { books } = db;
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const { books } = db;
  const { id } = req.params;
  const idx = books.findIndex((book) => book.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404).json('404 | страница не найдена');
  }
});

app.put('/api/books/:id', (req, res) => {
  const { books } = db;
  const { title, desc } = req.body;
  const { id } = req.params;
  const idx = books.findIndex((book) => book.id === id);

  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      desc,
    };

    res.json(books[idx]);
  } else {
    res.status(404).json('404 | страница не найдена');
  }
});

app.delete('/api/books/:id', (req, res) => {
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
