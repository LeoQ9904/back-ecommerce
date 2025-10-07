import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Address {
    @Prop({ required: true, trim: true })
    street: string;

    @Prop({ required: true, trim: true })
    city: string;

    @Prop({ required: true, trim: true })
    state: string;

    @Prop({ required: true, trim: true })
    zipCode: string;

    @Prop({ required: true, trim: true })
    country: string;

    @Prop({ default: false })
    isDefault: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ timestamps: true })
export class Customer {
    @Prop({ required: true, unique: true })
    firebaseUid: string;

    @Prop({ required: true, trim: true })
    email: string;

    @Prop({ trim: true })
    displayName?: string;

    @Prop({ trim: true })
    phoneNumber?: string;

    @Prop({ trim: true })
    photoURL?: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ type: [AddressSchema], default: [] })
    addresses: Address[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.index({ firebaseUid: 1 });
CustomerSchema.index({ email: 1 });

CustomerSchema.set('toJSON', {
    virtuals: true,
});
