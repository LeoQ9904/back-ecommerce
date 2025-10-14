import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './schema/cart.schema';
import { EmailService } from '../common/services/email.service';
import { Customer, CustomerSchema } from '../customers/schemas/customer.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Cart.name,
                schema: CartSchema,
            },
            {
                name: Customer.name,
                schema: CustomerSchema,
            },
        ]),
    ],
    controllers: [CartController],
    providers: [CartService, EmailService],
    exports: [CartService],
})
export class CartModule {}
