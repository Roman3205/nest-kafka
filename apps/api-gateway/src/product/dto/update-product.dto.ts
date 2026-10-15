import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateProductDto {
        @IsNotEmpty()
        @IsString()
        @IsOptional()
        name: string;
    
        @IsNumber()
        @Min(1)
        @IsNotEmpty()
        @IsPositive()
        @IsOptional()
        price: number;
    
        @IsString()
        @IsOptional()
        description?: string;
}