# My Fourth App

A **NestJS API** that demonstrates the use of **DTOs, Pipes, and Validation** in handling book-related data. This project uses **class-validator** for input validation and **custom pipes** for request transformation.

## Features
- **Book Retrieval**: Fetch a book by its ID.
- **Book Addition**: Validate and add a book using **DTOs** and **Validation Pipes**.
- **Custom Pipe**: Implements a NestJS **Pipe** for request validation and transformation.
- **Strong Type Safety**: Uses **TypeScript** for robust and maintainable code.

## Installation

### Clone the repository:
   ```sh
   git clone https://github.com/your-username/my-fourth-app.git
   cd my-fourth-app
   ```

## API Endpoints

### Book Endpoints
| Method | Endpoint      | Description                         |
| ------ | ------------ | ----------------------------------- |
| GET    | `/book/:id`  | Get book by ID (validates as `number`) |
| POST   | `/book/add`  | Add a book (validates `id` and `name`) |

## Code Flow

1. **BookController** handles incoming HTTP requests.
   - `@Get('/:id')` → Fetches a book by ID (validated using `ParseIntPipe`).
   - `@Post('/add')` → Adds a new book (validated using `ValidationPipe`).

2. **BookDto (Data Transfer Object)** ensures the request body has the correct format.
   - `id` must be a **number**.
   - `name` must be a **string**.

3. **BookPipe (Custom Pipe)** applies additional validation.
   - Uses **class-transformer** to convert raw request data into a class instance.
   - Uses **class-validator** to check if the data meets requirements.
   - Throws a **BadRequestException** if validation fails.

## Code Explanation

### 1. Book Controller (`book.controller.ts`)
Handles **HTTP requests** for the `/book` endpoint.
```typescript
import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from "@nestjs/common";
import { BookDto } from "./dto/book.dto";

@Controller('book')
export class BookController {
    @Get('/:id')
    getBookById(@Param('id', ParseIntPipe) id: number): string {
        console.log(id, typeof (id));
        return `Book with id`;
    }

    @Post('/add')
    addBook(@Body(new ValidationPipe()) book: BookDto): string {
        return 'Book added';
    }
}
```
- `@Get('/:id')` uses `ParseIntPipe` to ensure `id` is a number.
- `@Post('/add')` applies `ValidationPipe` to validate input.

### 2. Book DTO (`book.dto.ts`)
Defines **data structure** for books.
```typescript
import { IsNumber, IsString } from 'class-validator';

export class BookDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;
}
```
- `@IsNumber()` ensures `id` is a number.
- `@IsString()` ensures `name` is a string.

### 3. Custom Book Pipe (`book.pipe.ts`)
Validates and transforms request data.
```typescript
import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BookDto } from "../dto/book.dto";

export class BookPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const bookClass = plainToInstance(BookDto, value);

        const errors = await validate(bookClass);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed', JSON.stringify(errors));
        }

        console.log(value, typeof (value));
        return value;
    }
}
```
- Uses `plainToInstance` to convert raw request data to `BookDto`.
- Uses `validate` to check constraints (`id: number`, `name: string`).
- Throws `BadRequestException` if validation fails.

### 4. Book Module (`book.module.ts`)
Registers the **Book Controller**.
```typescript
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';

@Module({
  controllers: [BookController],
  providers: [],
})
export class BookModule {}
```

## Technologies Used
- **NestJS** - Framework for scalable Node.js applications.
- **TypeScript** - Strongly typed language for JavaScript.
- **Class-validator** - Validates request payloads.
- **Class-transformer** - Converts plain objects into class instances.
- **Pipes** - Custom transformation and validation.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
