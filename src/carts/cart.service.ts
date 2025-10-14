import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from '../common/services/email.service';
import { Customer, CustomerDocument } from '../customers/schemas/customer.schema';
import { CreateOrderDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument } from './schema/cart.schema';

@Injectable()
export class CartService {
    private readonly logger = new Logger(CartService.name);

    constructor(
        @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
        @InjectModel(Customer.name) private readonly customerModel: Model<CustomerDocument>,
        private readonly emailService: EmailService
    ) {}

    /**
     * Crea un nuevo carrito.
     * @param cartData Datos del carrito a crear
     * @returns El carrito creado
     */
    async createCart(cartData: CreateOrderDto): Promise<Cart> {
        const createdCart = new this.cartModel(cartData);
        const savedCart = await createdCart.save();

        // Enviar correo de confirmación
        try {
            const customer = await this.customerModel.findById(cartData.user_id);
            if (customer?.email && savedCart) {
                await this.emailService.sendCartConfirmation(customer.email, savedCart);
            }
        } catch (error) {
            this.logger.error('Error enviando correo de confirmación:', error);
        }

        return savedCart;
    }

    /**
     * Busca un carrito por ID de usuario.
     * @param userId ID del usuario
     * @returns El carrito encontrado o null si no existe
     */
    async findByUserId(userId: string): Promise<Cart[] | null> {
        return this.cartModel.find({ user_id: userId }).sort({ createdAt: -1 }).exec();
    }

    /**
     * Obtiene todos los carritos.
     * @returns Lista de todos los carritos
     */
    async findAll(): Promise<Cart[]> {
        return this.cartModel.find().exec();
    }

    /**
     * Busca un carrito por su ID.
     * @param id ID del carrito
     * @returns El carrito encontrado
     * @throws NotFoundException si el carrito no existe
     */
    async findById(id: string): Promise<Cart> {
        const cart = await this.cartModel.findById(id).exec();
        if (!cart) {
            throw new NotFoundException(`Cart with ID ${id} not found`);
        }
        return cart;
    }

    /**
     * Actualiza un carrito por su ID.
     * @param id ID del carrito
     * @param updateData Datos a actualizar
     * @returns El carrito actualizado
     * @throws NotFoundException si el carrito no existe
     */
    async updateCart(id: string, updateData: UpdateCartDto): Promise<Cart> {
        const updatedCart = await this.cartModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();

        if (!updatedCart) {
            throw new NotFoundException(`Cart with ID ${id} not found`);
        }

        return updatedCart;
    }

    /**
     * Actualiza un carrito por el ID del usuario.
     * @param userId ID del usuario
     * @param updateData Datos a actualizar
     * @returns El carrito actualizado
     * @throws NotFoundException si el carrito no existe
     */
    async updateCartByUserId(userId: string, updateData: UpdateCartDto): Promise<Cart> {
        const updatedCart = await this.cartModel
            .findOneAndUpdate({ user_id: userId }, updateData, { new: true })
            .exec();

        if (!updatedCart) {
            throw new NotFoundException(`Cart for user ${userId} not found`);
        }

        return updatedCart;
    }

    /**
     * Elimina un carrito por su ID.
     * @param id ID del carrito
     * @returns El carrito eliminado
     * @throws NotFoundException si el carrito no existe
     */
    async deleteCart(id: string): Promise<Cart> {
        const deletedCart = await this.cartModel.findByIdAndDelete(id).exec();
        if (!deletedCart) {
            throw new NotFoundException(`Cart with ID ${id} not found`);
        }
        return deletedCart;
    }

    /**
     * Elimina un carrito por el ID del usuario.
     * @param userId ID del usuario
     * @returns El carrito eliminado
     * @throws NotFoundException si el carrito no existe
     */
    async deleteCartByUserId(userId: string): Promise<Cart> {
        const deletedCart = await this.cartModel.findOneAndDelete({ user_id: userId }).exec();

        if (!deletedCart) {
            throw new NotFoundException(`Cart for user ${userId} not found`);
        }

        return deletedCart;
    }

    /**
     * Calcula el precio total del carrito basado en los productos.
     * @param cart El carrito
     * @returns El precio total calculado
     */
    calculateTotalPrice(cart: Cart): number {
        return cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
}
