import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  // Bu fonksiyon, token doğrulandıktan sonra otomatik olarak çalışır.
  // Token'ın içindeki payload'u parametre olarak alır.
  async validate(payload: { sub: number; email: string }): Promise<Omit<User, 'passwordHash'>> {
    // Token'ın içindeki kullanıcı ID'si (sub) ile veritabanından kullanıcıyı buluyoruz.
    // Bu, kullanıcının silinmesi gibi durumlara karşı ek güvenlik sağlar.
    const user = await this.usersService.findOneById(payload.sub); // Bu fonksiyonu users.service'e ekleyeceğiz.
    
    if (!user) {
      throw new UnauthorizedException('Kullanıcı bulunamadı.');
    }

    // Burada geri döndürdüğümüz değer, request objesine `req.user` olarak eklenir.
    // Güvenlik için şifre hash'ini asla geri döndürme.
    const { passwordHash, ...result } = user;
    return result;
  }
}