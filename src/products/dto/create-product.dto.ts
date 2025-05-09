import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, IsArray, MinLength } from 'class-validator';

export class CreateProductDto {
    

    @IsString() @MinLength(1)
    title: string;

    @IsNumber() @IsPositive() @IsOptional()
    price?: number;

    @IsOptional() @IsString()
    description?: string;

    @IsOptional() @IsString()
    slug?: string;

    @IsNumber() @IsPositive() @IsOptional()
    stock?: number;

    @IsArray() @IsString({ each: true })
    sizes: string[];

    @IsString() @IsNotEmpty()
    gender: string;

}
