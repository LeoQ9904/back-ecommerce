import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    ValidateNested,
} from 'class-validator';

export class CartProductDto {
    @ApiProperty({ description: 'Product ID', example: '507f1f77bcf86cd799439011' })
    @IsOptional()
    @IsString()
    _id?: string;

    @ApiProperty({ description: 'Product name', example: 'iPhone 14' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Product description', example: 'Latest iPhone model' })
    @IsString()
    description: string;

    @ApiProperty({ description: 'Product price', minimum: 0, example: 999.99 })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ description: 'Product stock', minimum: 0, example: 50 })
    @IsNumber()
    @Min(0)
    stock: number;

    @ApiProperty({ description: 'Product category', example: 'Electronics' })
    @IsString()
    category: string;

    @ApiProperty({ description: 'Product unit', example: 'piece' })
    @IsString()
    unit: string;

    @ApiProperty({
        description: 'Product image URL',
        required: false,
        example: 'https://example.com/image.jpg',
    })
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @ApiProperty({
        description: 'Product images array',
        required: false,
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @ApiProperty({ description: 'Product active status', default: true })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiProperty({
        description: 'Product tags',
        required: false,
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @ApiProperty({
        description: 'Product discount',
        minimum: 0,
        maximum: 100,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    discount?: number;

    @ApiProperty({ description: 'Product brand', required: false })
    @IsOptional()
    @IsString()
    brand?: string;

    @ApiProperty({ description: 'Popular product flag', default: false })
    @IsOptional()
    @IsBoolean()
    popular?: boolean;

    @ApiProperty({ description: 'New product flag', default: true })
    @IsOptional()
    @IsBoolean()
    nuevo?: boolean;
}

export class CartItemDto {
    @ApiProperty({ description: 'Product data' })
    @ValidateNested()
    @Type(() => Object)
    product: Record<string, unknown>;

    @ApiProperty({
        description: 'Quantity of the product',
        minimum: 1,
        example: 2,
    })
    @IsNumber()
    @Min(1)
    quantity: number;
}
