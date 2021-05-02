import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateBookDTO, UpdateBookDTO } from './book.dto';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get(':id')
  async getBook(@Param() params) {
    return await this.bookService.getBook(params.id);
  }

  @Get()
  async getAllBooks() {
    return await this.bookService.getAllBooks();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBook(@Body() data: CreateBookDTO, @Request() request) {
    return this.bookService.createBook({ ...data, author: request.user.id });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBook(
    @Param() params,
    @Body() data: UpdateBookDTO,
    @Request() request,
  ) {
    try {
      await this.bookService.updateBook(params.id, data, request.user.id);
      return 'Book Updated!';
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBook(@Param() params, @Request() request) {
    try {
      await this.bookService.deleteBook(params.id, request.user.id);
      return 'Book Deleted!';
    } catch (e) {
      throw e;
    }
  }
}
