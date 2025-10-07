import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './carts/cart.module';
import { CategoryModule } from './categories/categories.module';
import { env } from './config/env';
import { CustomersModule } from './customers/customers.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ProductsModule } from './products/products.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
    imports: [
        MongooseModule.forRoot(env.MONGODB_URI),
        ProductsModule,
        CategoryModule,
        CartModule,
        CustomersModule,
        NotificationsModule,
        UploadsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
