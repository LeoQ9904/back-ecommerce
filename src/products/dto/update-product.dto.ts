import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Max,
    Min,
} from 'class-validator';

export class UpdateProductDto {
    @ApiPropertyOptional({
        description: 'Nombre del producto',
        example: 'iPhone 15 Pro (Actualizado)',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        description: 'Descripción del producto',
        example: 'Descripción actualizada del producto',
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({
        description: 'Precio del producto',
        example: 899.99,
        minimum: 0,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    price?: number;

    @ApiPropertyOptional({
        description: 'Cantidad en stock',
        example: 75,
        minimum: 0,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    stock?: number;

    @ApiPropertyOptional({
        description: 'Categoría del producto',
        example: 'Smartphones',
    })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiPropertyOptional({
        description: 'URL de la imagen',
        example: 'https://example.com/new-image.jpg',
    })
    @IsOptional()
    @IsUrl()
    imageUrl?: string;

    @ApiPropertyOptional({
        description: 'Estado activo del producto',
        example: true,
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @ApiPropertyOptional({
        description: 'SKU del producto',
        example: 'IPH15PRO-256-BLUE',
    })
    @IsOptional()
    @IsString()
    sku?: string;

    @ApiPropertyOptional({
        description: 'Peso en gramos',
        example: 190,
        minimum: 0,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    weight?: number;

    @ApiPropertyOptional({
        description: 'Etiquetas del producto',
        example: ['smartphone', 'apple', 'actualizado'],
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @ApiPropertyOptional({
        description: 'Calificación del producto',
        example: 4.8,
        minimum: 0,
        maximum: 5,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    @Type(() => Number)
    rating?: number;

    @ApiPropertyOptional({
        description: 'Porcentaje de descuento',
        example: 20,
        minimum: 0,
        maximum: 100,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    @Type(() => Number)
    discount?: number;

    @ApiPropertyOptional({
        description: 'Marca del producto',
        example: 'Apple',
    })
    @IsOptional()
    @IsString()
    brand?: string;
}
