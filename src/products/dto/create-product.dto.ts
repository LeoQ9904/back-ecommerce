import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    Max,
    Min,
} from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        description: 'Nombre del producto',
        example: 'iPhone 15 Pro',
        minLength: 1,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Descripción detallada del producto',
        example: 'Smartphone Apple iPhone 15 Pro con cámara profesional y chip A17 Pro',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Precio del producto en la moneda local',
        example: 999.99,
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    price: number;

    @ApiProperty({
        description: 'Cantidad disponible en inventario',
        example: 50,
        minimum: 0,
    })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    stock: number;

    @ApiProperty({
        description: 'Categoría del producto',
        example: 'Electrónicos',
    })
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiPropertyOptional({
        description: 'URL de la imagen del producto',
        example: 'https://example.com/image.jpg',
    })
    @IsOptional()
    @IsUrl()
    imageUrl?: string;

    @ApiPropertyOptional({
        description: 'Código único del producto (SKU)',
        example: 'IPH15PRO-256-BLACK',
    })
    @IsOptional()
    @IsString()
    sku?: string;

    @ApiPropertyOptional({
        description: 'Peso del producto en gramos',
        example: 187,
        minimum: 0,
    })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    weight?: number;

    @ApiPropertyOptional({
        description: 'Etiquetas para categorización adicional',
        example: ['smartphone', 'apple', 'premium'],
        type: [String],
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];

    @ApiPropertyOptional({
        description: 'Calificación promedio del producto',
        example: 4.5,
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
        description: 'Porcentaje de descuento aplicado',
        example: 15,
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

    @ApiProperty({
        description: 'Marcar producto como destacado',
        example: false,
    })
    @IsBoolean()
    popular: boolean;

    @ApiProperty({
        description: 'Marcar producto como nuevo.',
        example: true,
    })
    @IsBoolean()
    nuevo: boolean;
}
