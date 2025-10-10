import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({ _id: false })
export class CartItem {
    @ApiProperty({ description: 'Product data' })
    @Prop({ required: true, type: MongooseSchema.Types.Mixed })
    product: Record<string, unknown>;

    @ApiProperty({ description: 'Quantity of the product', minimum: 1, example: 2 })
    @Prop({ required: true, min: 1 })
    quantity: number;
}

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class Cart {
    @ApiProperty({ description: 'User ID', example: '507f1f77bcf86cd799439011' })
    @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
    user_id: string;

    @ApiProperty({ description: 'Cart items', type: [CartItem] })
    @Prop({ required: true, type: [CartItem], default: [] })
    items: CartItem[];

    @ApiProperty({ description: 'Total discount amount', minimum: 0, example: 10.5 })
    @Prop({ required: true, min: 0, default: 0 })
    totalDiscount: number;

    @ApiProperty({ description: 'Total price', minimum: 0, example: 89.5 })
    @Prop({ required: true, min: 0, default: 0 })
    totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.index({ user_id: 1 });
CartSchema.index({ createdAt: -1 });
CartSchema.index({ updatedAt: -1 });
