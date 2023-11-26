import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';
import { RestaurantModule } from './restaurant/restaurant.module';
import { JwtModule } from '@nestjs/jwt';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    DatabaseModule,
    RestaurantModule,
    JwtModule.register({}),
    OrderModule,
    MenuModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
