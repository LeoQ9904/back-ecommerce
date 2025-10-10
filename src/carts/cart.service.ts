import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart';
import { Cart, CartDocument } from './schema/cart.schema';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>) {}

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
        return this.cartModel.findOne({ user_id: userId }).exec();
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
     * Agrega un producto al carrito o actualiza la cantidad si ya existe.
     * @param userId ID del usuario
     * @param productData Datos del producto
     * @param quantity Cantidad del producto
     * @returns El carrito actualizado
     */
    async addProductToCart(
        userId: string,
        productData: Record<string, unknown>,
        quantity: number
    ): Promise<Cart> {
        let cart = await this.findByUserId(userId);

        if (!cart) {
            // Crear nuevo carrito si no existe
            const newCartData = {
                user_id: userId,
                items: [{ product: productData, quantity }],
                totalDiscount: 0,
                totalPrice: (productData.price as number) * quantity,
            };
            cart = await this.createCart(newCartData);
        } else {
            // Verificar si el producto ya existe en el carrito
            const existingItemIndex = cart.items.findIndex(
                item => item.product.name === productData.name
            );

            const updateData: UpdateCartDto = {
                items: [...cart.items],
                totalPrice: 0,
            };

            if (existingItemIndex > -1) {
                // Actualizar cantidad si el producto ya existe
                if (updateData.items) {
                    updateData.items[existingItemIndex].quantity += quantity;
                }
            } else {
                // Agregar nuevo producto
                if (updateData.items) {
                    updateData.items.push({ product: productData, quantity });
                }
            }

            // Recalcular el precio total
            updateData.totalPrice =
                updateData.items?.reduce(
                    (total, item) => total + (item.product.price as number) * item.quantity,
                    0
                ) ?? 0;

            // Guardar los cambios
            cart = await this.updateCartByUserId(userId, updateData);
        }

        return cart;
    }

    /**
     * Calcula el precio total del carrito basado en los productos.
     * @param cart El carrito
     * @returns El precio total calculado
     */
    calculateTotalPrice(cart: Cart): number {
        return cart.items.reduce(
            (total, item) => total + (item.product.price as number) * item.quantity,
            0
        );
    }
}
