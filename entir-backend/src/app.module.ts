import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoadsModule } from './loads/loads.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    // 1. .env dosyasını global olarak kullanılabilir yap
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    // 2. TypeORM ile veritabanı bağlantısını yapılandır
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT', '5432')), // Varsayılan PostgreSQL portu
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Entity dosyalarını otomatik tanı
        synchronize: true, // DİKKAT: Geliştirme için true, production'da false olmalı!
      }),
    }),
    
    UsersModule,
    AuthModule,
    LoadsModule,
    OffersModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}