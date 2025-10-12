import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';
import { CartService } from './cart.service';
import { CreateOrderDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './schema/cart.schema';

@ApiTags('Carts')
@Controller('cart')
@UseInterceptors(ResponseInterceptor)
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post()
    @ApiOperation({ summary: 'Crear nuevo Cart' })
    @ApiBody({ type: CreateOrderDto })
    @ApiResponse({
        status: 201,
        description: 'Cart creado exitosamente',
        type: Cart,
    })
    @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
    async createCart(@Body() cartData: CreateOrderDto): Promise<Cart> {
        return this.cartService.createCart(cartData);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los carts' })
    @ApiResponse({
        status: 200,
        description: 'Lista de carts',
        type: [Cart],
    })
    async getAllCarts(): Promise<Cart[]> {
        return this.cartService.findAll();
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Obtener cart por ID de usuario' })
    @ApiParam({
        name: 'userId',
        description: 'ID de usuario',
        type: String,
    })
    @ApiResponse({ status: 200, description: 'Cart encontrado', type: Cart })
    @ApiResponse({ status: 404, description: 'Cart no encontrado' })
    async getCartByUserId(@Param('userId') userId: string): Promise<Cart[] | null> {
        return this.cartService.findByUserId(userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener cart por ID' })
    @ApiParam({ name: 'id', description: 'ID del cart', type: String })
    @ApiResponse({ status: 200, description: 'Cart encontrado', type: Cart })
    @ApiResponse({ status: 404, description: 'Cart no encontrado' })
    async getCartById(@Param('id') id: string): Promise<Cart> {
        return this.cartService.findById(id);
    }

    @Patch('user/:userId')
    @ApiOperation({ summary: 'Actualizar cart por ID de usuario' })
    @ApiParam({
        name: 'userId',
        description: 'ID de usuario',
        type: String,
    })
    @ApiBody({ type: UpdateCartDto })
    @ApiResponse({
        status: 200,
        description: 'Cart actualizado exitosamente',
        type: Cart,
    })
    @ApiResponse({ status: 404, description: 'Cart no encontrado' })
    async updateCartByUserId(
        @Param('userId') userId: string,
        @Body() updateData: UpdateCartDto
    ): Promise<Cart> {
        return this.cartService.updateCartByUserId(userId, updateData);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar cart por ID' })
    @ApiParam({ name: 'id', description: 'ID del cart', type: String })
    @ApiResponse({
        status: 200,
        description: 'Cart eliminado exitosamente',
        type: Cart,
    })
    @ApiResponse({ status: 404, description: 'Cart no encontrado' })
    async deleteCart(@Param('id') id: string): Promise<Cart> {
        return this.cartService.deleteCart(id);
    }

    @Delete('user/:userId')
    @ApiOperation({ summary: 'Eliminar cart por ID de usuario' })
    @ApiParam({
        name: 'userId',
        description: 'ID de usuario',
        type: String,
    })
    @ApiResponse({
        status: 200,
        description: 'Cart eliminado exitosamente',
        type: Cart,
    })
    @ApiResponse({ status: 404, description: 'Cart no encontrado' })
    async deleteCartByUserId(@Param('userId') userId: string): Promise<Cart> {
        return this.cartService.deleteCartByUserId(userId);
    }
}
