import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductDocument } from '../schemas/product.schema';

export class ProductResponseDto {
    @ApiProperty({
        description: 'Id del producto',
        example: '5',
    })
    _id: string;

    @ApiProperty({
        description: 'Nombre del producto',
        example: 'iPhone 15 Pro',
    })
    name: string;

    @ApiProperty({
        description: 'Descripción del producto',
        example: 'Smartphone Apple iPhone 15 Pro con cámara profesional',
    })
    description: string;

    @ApiProperty({
        description: 'Precio del producto',
        example: 999.99,
    })
    price: number;

    @ApiProperty({
        description: 'Cantidad en stock',
        example: 50,
    })
    stock: number;

    @ApiProperty({
        description: 'Categoría del producto',
        example: 'Electrónicos',
    })
    category: string;

    @ApiProperty({
        description: 'Unidad de medida',
        example: 'lb',
    })
    unit: string;

    @ApiPropertyOptional({
        description: 'URL de la imagen',
        example: 'https://example.com/image.jpg',
    })
    imageUrl?: string;

    @ApiPropertyOptional({
        description: 'URLs de imágenes',
        example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    })
    images?: string[];

    @ApiProperty({
        description: 'Estado activo del producto',
        example: true,
    })
    isActive: boolean;

    @ApiPropertyOptional({
        description: 'SKU del producto',
        example: 'IPH15PRO-256-BLACK',
    })
    sku?: string;

    @ApiPropertyOptional({
        description: 'Peso en gramos',
        example: 187,
    })
    weight?: number;

    @ApiPropertyOptional({
        description: 'Etiquetas del producto',
        example: ['smartphone', 'apple', 'premium'],
    })
    tags?: string[];

    @ApiPropertyOptional({
        description: 'Calificación promedio',
        example: 4.5,
    })
    rating?: number;

    @ApiPropertyOptional({
        description: 'Porcentaje de descuento',
        example: 15,
    })
    discount?: number;

    @ApiPropertyOptional({
        description: 'Marca del producto',
        example: 'Apple',
    })
    brand?: string;

    @ApiProperty({
        description: 'Marcar producto como destacado',
        example: false,
    })
    popular: boolean;

    @ApiProperty({
        description: 'Marcar producto como nuevo',
        example: false,
    })
    nuevo: boolean;

    constructor(product: ProductDocument) {
        this._id = String(product._id);
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.category = product.category;
        this.unit = product.unit;
        this.imageUrl = product.imageUrl;
        this.images = product.images;
        this.isActive = product.isActive;
        this.tags = product.tags;
        this.discount = product.discount;
        this.brand = product.brand;
        this.popular = product.popular;
        this.nuevo = product.nuevo ?? false;
    }
}

export class PaginatedProductsResponseDto {
    @ApiProperty({
        description: 'Lista de productos',
        type: [ProductResponseDto],
    })
    products: ProductResponseDto[];

    @ApiProperty({
        description: 'Total de productos encontrados',
        example: 156,
    })
    total: number;

    @ApiProperty({
        description: 'Página actual',
        example: 1,
    })
    page: number;

    @ApiProperty({
        description: 'Total de páginas',
        example: 16,
    })
    totalPages: number;

    @ApiProperty({
        description: 'Productos por página',
        example: 10,
    })
    limit: number;
}

export class ProductStatisticsResponseDto {
    @ApiProperty({
        description: 'Total de productos',
        example: 156,
    })
    totalProducts: number;

    @ApiProperty({
        description: 'Productos activos',
        example: 145,
    })
    activeProducts: number;

    @ApiProperty({
        description: 'Productos inactivos',
        example: 11,
    })
    inactiveProducts: number;

    @ApiProperty({
        description: 'Productos sin stock',
        example: 5,
    })
    outOfStockProducts: number;

    @ApiProperty({
        description: 'Productos con stock bajo',
        example: 12,
    })
    lowStockProducts: number;

    @ApiProperty({
        description: 'Valor total del inventario',
        example: 125000.5,
    })
    totalInventoryValue: number;

    @ApiProperty({
        description: 'Categorías únicas',
        example: ['Electrónicos', 'Ropa', 'Hogar', 'Deportes'],
    })
    categories: string[];

    @ApiProperty({
        description: 'Marcas únicas',
        example: ['Apple', 'Samsung', 'Nike', 'Adidas'],
    })
    brands: string[];
}
