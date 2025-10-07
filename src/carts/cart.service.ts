import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './schema/cart.schema';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private readonly cartModel: Model<Cart>) {}

    /**
     * Crea un nuevo carrito.
     * @param cartData Datos del carrito a crear
     * @returns El carrito creado
     */
    async createCart(cartData: CreateCartDto): Promise<Cart> {
        const createdCart = new this.cartModel(cartData);
        return createdCart.save();
    }

    /**
     * Busca un carrito por ID de usuario.
     * @param userId ID del usuario
     * @returns El carrito encontrado o null si no existe
     */
    async findByUserId(userId: string): Promise<Cart | null> {
        return this.cartModel.findOne({ userId }).exec();
    }
}
