import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ColorsModule } from './colors/colors.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { DatabaseSeeder } from './database/database-seeder.service';
import { AdminService } from './services/admin.service';
import { SizesService } from './services/sizes.service';
import { AdminController } from './controllers/admin.controller';
import { SizesController } from './controllers/sizes.controller';
import { ProductSchema } from './schemas/product.schema';
import { ColorSchema } from './schemas/color.schema';
import { SizeSchema } from './schemas/size.schema';
import { ProductVariantSchema } from './schemas/product-variant.schema';
import { CustomerSchema } from './schemas/customer.schema';
import { OrderSchema } from './schemas/order.schema';
import { OrderItemSchema } from './schemas/order-item.schema';
import { AdminSchema } from './schemas/admin.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/finalproject', {
      dbName: 'finalproject'
    }),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Color', schema: ColorSchema },
      { name: 'Size', schema: SizeSchema },
      { name: 'ProductVariant', schema: ProductVariantSchema },
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Order', schema: OrderSchema },
      { name: 'OrderItem', schema: OrderItemSchema },
      { name: 'Admin', schema: AdminSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    ProductsModule,
    ColorsModule,
    OrdersModule,
    CustomersModule,
  ],
  controllers: [AdminController, SizesController],
  providers: [DatabaseSeeder, AdminService, SizesService],
})
export class AppModule {}