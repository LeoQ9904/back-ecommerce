import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './schema/cart.schema';

@ApiTags('Carts')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post()
    @ApiOperation({ summary: 'Crear nuevo Cart' })
    @ApiBody({ type: CreateCartDto })
    @ApiResponse({ status: 201, description: 'Cart creado exitosamente', type: Cart })
    @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
    async createCart(@Body() cartData: CreateCartDto): Promise<Cart> {
        return this.cartService.createCart(cartData);
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Obtener cart por ID de usuario' })
    @ApiParam({ name: 'userId', description: 'ID de usuario', type: String })
    @ApiResponse({ status: 200, description: 'Cart encontrado', type: Cart })
    @ApiResponse({ status: 404, description: 'Cart no encontrado' })
    async getCartByUserId(@Param('userId') userId: string): Promise<Cart | null> {
        return this.cartService.findByUserId(userId);
    }
}
