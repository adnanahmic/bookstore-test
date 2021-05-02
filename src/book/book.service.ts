import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDTO, UpdateBookDTO } from './book.dto';
import { Book, BookDocument } from './book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async createBook(data: any): Promise<Book> {
    const book = new this.bookModel(data);
    return book.save();
  }

  async getBook(id: string): Promise<Book> {
    return this.bookModel.findOne({ _id: id }).exec();
  }

  async getAllBooks(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async updateBook(id: string, data: any, userId: any): Promise<any> {
    const book = await this.bookModel.findOneAndUpdate(
      { _id: id, author: userId },
      data,
    );
    if (!book) throw new BadRequestException();
    return book;
  }

  async deleteBook(id: string, userId: any): Promise<any> {
    const result = await this.bookModel
      .findOneAndDelete({ _id: id, author: userId })
      .exec();
    if (!result) throw new BadRequestException();
    return result;
  }
}
