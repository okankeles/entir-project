import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport'; // Passport modülünü de ekleyelim

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }), // Passport'u JWT stratejisiyle hazırla
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }, // Token 1 gün geçerli olsun
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], // Henüz strateji eklemedik, bir sonraki adımda ekleyeceğiz
  exports: [PassportModule, JwtModule], // Diğer modüllerin kullanabilmesi için
})
export class AuthModule {}