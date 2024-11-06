const { v4: uuid } = require('uuid');

class Book {
    constructor(title = '', desc = '', fileName = '', id = uuid()) {
      this.id = id;
      this.title = title;
      this.description = desc;
      this.authors = '';
      this.favorite = '';
      this.fileCover = '';
      this.fileName = fileName;
      this.fileBook = '';
    }
};

module.exports.Book = Book;