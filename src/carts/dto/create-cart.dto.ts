import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    ArrayNotEmpty,
    IsArray,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import { AddressDto } from '../../customers/dto/create-customer.dto';
import { CreateProductDto } from '../../products/dto/create-product.dto';

// DTO para el producto
class ProductDto extends PartialType(CreateProductDto) {
    @IsMongoId()
    @IsNotEmpty()
    _id: string;
}

// DTO para cada item del pedido
class OrderItemDto {
    @ValidateNested()
    @Type(() => ProductDto)
    product: ProductDto;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

// DTO principal del pedido
export class CreateOrderDto {
    @IsMongoId()
    @IsNotEmpty()
    user_id: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @ApiPropertyOptional({
        description: 'Direcciones del cliente',
        type: [AddressDto],
        example: {
            street: 'Calle 123 #45-67',
            city: 'Bogotá',
            state: 'Cundinamarca',
            zipCode: '110111',
            country: 'Colombia',
            isDefault: true,
        },
    })
    @IsOptional()
    @Type(() => AddressDto)
    address: AddressDto;

    @IsNumber()
    @IsOptional()
    totalDiscount?: number;

    @IsNumber()
    @IsOptional()
    totalPrice?: number;
}
