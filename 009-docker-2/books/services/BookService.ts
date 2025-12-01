import "reflect-metadata";
import { injectable } from "inversify";
import Book from "../models/Book";
import { BooksRepository } from '../repositories/BookRepository';

@injectable()
export class BookService extends BooksRepository {
	
	constructor() {
		super();

		console.log('bookService init123')
	}

	async createBook(book: typeof Book): Promise<any> {
		const newBook = new Book(book);
		await newBook.save();
		return newBook;
	}

	async getBook(bookId: string): Promise<any> {
		const book = await Book.findById(bookId);
		return book;
	}

	async getBooks(): Promise<any> {
		const books = await Book.find();
    return books;
	}

	async deleteBook(bookId: string): Promise<any> {
		await Book.findByIdAndDelete(bookId);
	}

	async updateBook(bookId: string, book: typeof Book): Promise<any> {
		await Book.findByIdAndUpdate(bookId, book);
	}
}