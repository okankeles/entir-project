import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // UsersModule'ü import et

@Module({
  imports: [UsersModule], // Import listesine ekle
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}