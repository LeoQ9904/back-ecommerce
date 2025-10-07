import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true, trim: true })
    name: string;

    @Prop({ required: true, trim: true })
    description: string;

    @Prop({ required: true, min: 0 })
    price: number;

    @Prop({ required: true, min: 0, default: 0 })
    stock: number;

    @Prop({ required: true, trim: true })
    category: string;

    @Prop({ required: true, trim: true })
    unit: string;

    @Prop({ trim: true })
    imageUrl?: string;

    @Prop({ trim: true })
    images?: string[];

    @Prop({ default: true })
    isActive: boolean;

    @Prop([String])
    tags?: string[];

    @Prop({ min: 0, max: 100 })
    discount?: number;

    @Prop()
    brand?: string;

    @Prop({ default: false })
    popular: boolean;

    @Prop({ default: true })
    nuevo?: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Índices para optimizar búsquedas
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 'text' });
ProductSchema.index({ price: 1 });
ProductSchema.index({ stock: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ createdAt: -1 });

ProductSchema.set('toJSON', {
    virtuals: true,
});
ProductSchema.set('toObject', { virtuals: true });
