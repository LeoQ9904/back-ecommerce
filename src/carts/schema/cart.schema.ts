import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Types } from 'mongoose';
import { CounterSchema } from '../../counter/schemas/counter.schema';
import { Address, AddressSchema } from '../../customers/schemas/customer.schema';
import { Product } from '../../products/schemas/product.schema';

@Schema({ _id: false })
export class CartItem {
    @ApiProperty({ description: 'Product data' })
    @Prop({ required: true, type: Product })
    product: Product;

    @ApiProperty({ description: 'Quantity of the product', minimum: 1, example: 2 })
    @Prop({ required: true, min: 1 })
    quantity: number;
}

export type CartDocument = Cart & Document;

export enum CartStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class Cart {
    @ApiProperty({ description: 'User ID', example: '507f1f77bcf86cd799439011' })
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    user_id: string;

    @ApiProperty({ description: 'Cart items', type: [CartItem] })
    @Prop({ required: true, type: [CartItem], default: [] })
    items: CartItem[];

    @ApiProperty({ description: 'Cart status', enum: CartStatus, example: CartStatus.ACTIVE })
    @Prop({ required: true, enum: CartStatus, default: CartStatus.ACTIVE })
    status: CartStatus;

    @Prop({ type: AddressSchema, default: {} })
    address: Address;

    @ApiProperty({ description: 'Total discount amount', minimum: 0, example: 10.5 })
    @Prop({ required: true, min: 0, default: 0 })
    totalDiscount: number;

    @ApiProperty({ description: 'Total price', minimum: 0, example: 89.5 })
    @Prop({ required: true, min: 0, default: 0 })
    totalPrice: number;

    @ApiProperty({ description: 'Order number', example: 1001 })
    @Prop({ unique: true })
    numberOrder: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.index({ user_id: 1 });
CartSchema.index({ createdAt: -1 });
CartSchema.index({ updatedAt: -1 });

// Hook para incrementar automáticamente
CartSchema.pre<CartDocument>('save', async function (next) {
    if (this.isNew) {
        const counterModel = this.db.model('Counter', CounterSchema);
        const counter = await counterModel.findOneAndUpdate(
            { model: 'Cart' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.numberOrder = counter.seq;
    }
    next();
});
