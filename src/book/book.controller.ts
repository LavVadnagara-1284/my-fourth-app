import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from "@nestjs/common";
import { BookDto } from "./dto/book.dto";
// import { BookPipe } from "./pipes/book.pipe";

@Controller('book')

export class BookController {
    @Get('/:id')
    getBookById(@Param('id', ParseIntPipe) id: number): string {
        console.log(id, typeof (id));
        return `Book with id`;
    }

    // @Post('/add')
    // addBook(@Body(new BookPipe()) book : BookDto) : string {
    //     return 'Book added';
    // }
    @Post('/add')
    addBook(@Body(new ValidationPipe()) book: BookDto): string {
        return 'Book added';
    }
}