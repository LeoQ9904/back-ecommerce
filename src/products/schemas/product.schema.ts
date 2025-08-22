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

    @Prop({ trim: true })
    imageUrl?: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ unique: true, sparse: true })
    sku?: string;

    @Prop({ min: 0 })
    weight?: number;

    @Prop([String])
    tags?: string[];

    @Prop({ min: 0, max: 5 })
    rating?: number;

    @Prop({ min: 0, default: 0 })
    reviewCount?: number;

    @Prop({ min: 0, max: 100 })
    discount?: number;

    @Prop()
    brand?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// Índices para optimizar búsquedas
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ stock: 1 });
ProductSchema.index({ isActive: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ createdAt: -1 });

// Middleware para generar SKU automáticamente
ProductSchema.pre('save', function() {
    if (!this.sku) {
        this.sku = `PRD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    }
});

// Virtual para precio con descuento
ProductSchema.virtual('discountedPrice').get(function() {
    if (this.discount && this.discount > 0) {
        return this.price * (1 - this.discount / 100);
    }
    return this.price;
});

// Virtual para verificar stock
ProductSchema.virtual('inStock').get(function() {
    return this.stock > 0;
});

ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });
