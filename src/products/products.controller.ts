import {
    Controller,
    Get,
    Param,
    Query,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
@UsePipes(new ValidationPipe({ transform: true }))
@UseInterceptors(ResponseInterceptor)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    public async findAll(): Promise<ProductResponseDto[]> {
        const products = await this.productsService.findAll();
        return products.map(product => new ProductResponseDto(product));
    }

    @Get('popular')
    public async findAllPopular(): Promise<ProductResponseDto[]> {
        const products = await this.productsService.findAllPopular();
        return products.map(product => new ProductResponseDto(product));
    }

    @Get('category/:category')
    public async findByCategory(
        @Param('category') category: string,
        @Query('search') search?: string
    ): Promise<ProductResponseDto[]> {
        const products = await this.productsService.findByCategory(category, search);
        return products.map(product => new ProductResponseDto(product));
    }

    @Get('discounted')
    public async findAllDiscounted(): Promise<ProductResponseDto[]> {
        const products = await this.productsService.findAllDiscounted();
        return products.map(product => new ProductResponseDto(product));
    }

    @Get('nuevos')
    public async findNewProduct(): Promise<ProductResponseDto[]> {
        const products = await this.productsService.findNewProduct();
        return products.map(product => new ProductResponseDto(product));
    }
}
