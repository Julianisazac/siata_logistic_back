import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {

    @IsString()
    @MaxLength(150)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

}

export class UpdateProductDto {

    @IsOptional()
    @IsString()
    @MaxLength(150)
    name?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;

}