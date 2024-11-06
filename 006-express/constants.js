const { Book } = require('./book');

const db = {
  books: [new Book('test', 'my test'), new Book('test1', 'my test1'), new Book('test2', 'my test2')],
};

const apiKey = '/api';

const credentials = { id: 1, mail: 'test@mail.ru' };

module.exports = {
  db,
  apiKey,
  credentials,
};
