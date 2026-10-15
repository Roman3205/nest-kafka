import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    @IsPositive()
    price: number;

    @IsString()
    @IsOptional()
    description?: string;
}