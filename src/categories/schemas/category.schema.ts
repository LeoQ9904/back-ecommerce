import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
    _id: Types.ObjectId;

    @Prop({ required: true, unique: true, trim: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    isActive: boolean;

    @Prop({ required: false, trim: true })
    slug?: string;

    @Prop({ required: false, trim: true })
    imageUrl?: string;

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    parentId?: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.index({ name: 'text', description: 'text' });
CategorySchema.index({ isActive: 1 });
CategorySchema.index({ parentId: 1 });
CategorySchema.index({ createdAt: -1 });

CategorySchema.set('toJSON', {
    virtuals: true,
});
CategorySchema.set('toObject', { virtuals: true });
