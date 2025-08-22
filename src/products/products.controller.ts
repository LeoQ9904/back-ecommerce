import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import {
    PaginatedProductsResponseDto,
    ProductResponseDto,
    ProductStatisticsResponseDto,
} from './dto/product-response.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiCreatedResponse({
        description: 'Producto creado exitosamente',
        type: ProductResponseDto,
    })
    @ApiBadRequestResponse({ description: 'Datos de entrada inválidos' })
    @ApiBody({ type: CreateProductDto })
    async create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener lista de productos con filtros y paginación' })
    @ApiOkResponse({
        description: 'Lista de productos obtenida exitosamente',
        type: PaginatedProductsResponseDto,
    })
    @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: 'Límite de productos por página',
        example: 10,
    })
    @ApiQuery({ name: 'category', required: false, description: 'Filtrar por categoría' })
    @ApiQuery({ name: 'brand', required: false, description: 'Filtrar por marca' })
    @ApiQuery({ name: 'minPrice', required: false, description: 'Precio mínimo' })
    @ApiQuery({ name: 'maxPrice', required: false, description: 'Precio máximo' })
    @ApiQuery({ name: 'inStock', required: false, description: 'Filtrar productos en stock' })
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('category') category?: string,
        @Query('brand') brand?: string,
        @Query('minPrice') minPrice?: number,
        @Query('maxPrice') maxPrice?: number,
        @Query('inStock') inStock?: boolean
    ) {
        const filters = { category, brand, minPrice, maxPrice, inStock };
        return this.productsService.findAll(page, limit, filters);
    }

    @Get('search')
    @ApiOperation({ summary: 'Buscar productos por término de búsqueda' })
    @ApiQuery({ name: 'q', description: 'Término de búsqueda', example: 'iPhone' })
    @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Límite por página', example: 10 })
    @ApiOkResponse({
        description: 'Resultados de búsqueda obtenidos exitosamente',
        type: PaginatedProductsResponseDto,
    })
    async search(
        @Query('q') searchTerm: string,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
    ) {
        if (!searchTerm) {
            return { products: [], total: 0, page, totalPages: 0 };
        }
        return this.productsService.search(searchTerm, page, limit);
    }

    @Get('statistics')
    @ApiOperation({ summary: 'Obtener estadísticas generales de productos' })
    @ApiOkResponse({
        description: 'Estadísticas obtenidas exitosamente',
        type: ProductStatisticsResponseDto,
    })
    async getStatistics() {
        return this.productsService.getStatistics();
    }

    @Get('low-stock')
    async getLowStockProducts(
        @Query('threshold', new DefaultValuePipe(10), ParseIntPipe) threshold: number
    ) {
        return this.productsService.getLowStockProducts(threshold);
    }

    @Get('out-of-stock')
    async getOutOfStockProducts() {
        return this.productsService.getOutOfStockProducts();
    }

    @Get('top-rated')
    async getTopProducts(@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number) {
        return this.productsService.getTopProducts(limit);
    }

    @Get('category/:category')
    async getByCategory(
        @Param('category') category: string,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
    ) {
        return this.productsService.getProductsByCategory(category, page, limit);
    }

    @Get('price-range')
    async getByPriceRange(
        @Query('minPrice', ParseIntPipe) minPrice: number,
        @Query('maxPrice', ParseIntPipe) maxPrice: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number
    ) {
        return this.productsService.getProductsByPriceRange(minPrice, maxPrice, page, limit);
    }

    @Get('sku/:sku')
    async findBySku(@Param('sku') sku: string) {
        return this.productsService.findBySku(sku);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un producto por ID' })
    @ApiParam({ name: 'id', description: 'ID del producto' })
    @ApiOkResponse({ description: 'Producto encontrado exitosamente' })
    @ApiNotFoundResponse({ description: 'Producto no encontrado' })
    async findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un producto por ID' })
    @ApiParam({ name: 'id', description: 'ID del producto' })
    @ApiBody({ type: UpdateProductDto })
    @ApiOkResponse({ description: 'Producto actualizado exitosamente' })
    @ApiNotFoundResponse({ description: 'Producto no encontrado' })
    @ApiBadRequestResponse({ description: 'Datos de entrada inválidos' })
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }

    @Patch(':id/stock')
    async updateStock(
        @Param('id') id: string,
        @Body() body: { quantity: number; operation?: 'add' | 'subtract' | 'set' }
    ) {
        const { quantity, operation = 'set' } = body;
        return this.productsService.updateStock(id, quantity, operation);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar un producto (soft delete)' })
    @ApiParam({ name: 'id', description: 'ID del producto' })
    @ApiNoContentResponse({ description: 'Producto eliminado exitosamente' })
    @ApiNotFoundResponse({ description: 'Producto no encontrado' })
    async remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }

    @Delete(':id/hard')
    @HttpCode(HttpStatus.NO_CONTENT)
    async hardDelete(@Param('id') id: string) {
        return this.productsService.hardDelete(id);
    }
}
