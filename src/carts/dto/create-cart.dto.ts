import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, Min, ValidateNested } from 'class-validator';

export class CreateCartItemDto {
    @ApiProperty({ description: 'Product ID', example: '507f1f77bcf86cd799439011' })
    @IsString()
    product: string;

    @ApiProperty({ description: 'Quantity of the product', minimum: 1, example: 2 })
    @IsNumber()
    @Min(1)
    quantity: number;
}

export class CreateCartDto {
    @ApiProperty({ description: 'User ID', example: '507f1f77bcf86cd799439011' })
    @IsString()
    user_id: string;

    @ApiProperty({ description: 'Cart items', type: [CreateCartItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCartItemDto)
    items: CreateCartItemDto[];

    @ApiProperty({ description: 'Total discount amount', minimum: 0, example: 10.5 })
    @IsNumber()
    @Min(0)
    totalDiscount: number;

    @ApiProperty({ description: 'Total price', minimum: 0, example: 89.5 })
    @IsNumber()
    @Min(0)
    totalPrice: number;
}
