import { IsNumber, IsString } from 'class-validator';

export class BookDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;
}
