import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

export enum NotificationStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    ARCHIVED = 'archived',
}

@Schema({ timestamps: true })
export class Notification {
    @Prop({ required: true, trim: true })
    title: string;

    @Prop({ required: true, trim: true })
    description: string;

    @Prop({ trim: true })
    backgroundImage?: string;

    @Prop({
        type: String,
        enum: NotificationStatus,
        default: NotificationStatus.ACTIVE,
    })
    status: NotificationStatus;

    @Prop({ default: true })
    isVisible: boolean;

    @Prop()
    expirationDate?: Date;

    @Prop({ default: 0 })
    priority: number;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

// Índices para optimizar búsquedas
NotificationSchema.index({ title: 'text', description: 'text' });
NotificationSchema.index({ status: 1 });
NotificationSchema.index({ isVisible: 1 });
NotificationSchema.index({ priority: -1 });
NotificationSchema.index({ createdAt: -1 });
NotificationSchema.index({ expirationDate: 1 });

NotificationSchema.set('toJSON', {
    virtuals: true,
});
NotificationSchema.set('toObject', { virtuals: true });
