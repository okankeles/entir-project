import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // 1. Kullanıcı zaten var mı diye kontrol et
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Bu email adresi zaten kullanılıyor.');
    }

    // 2. Şifreyi hash'le
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    // 3. users.service aracılığıyla kullanıcıyı oluştur
    const user = await this.usersService.create({
      full_name: registerDto.full_name,
      email: registerDto.email,
      phone_number: registerDto.phone_number,
      user_type: registerDto.user_type,
      passwordHash: hashedPassword,
    });

    // 4. Şifreyi geri döndürme
    const { passwordHash, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    // 1. Kullanıcıyı email ile bul
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Giriş bilgileri hatalı.');
    }

    // 2. Veritabanındaki hash'lenmiş şifre ile kullanıcının girdiği şifreyi karşılaştır
    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.passwordHash,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Giriş bilgileri hatalı.');
    }

    // 3. Şifre doğruysa, JWT oluştur
    // 'sub' (subject) genellikle kullanıcı ID'si için kullanılır.
    const payload = {
      sub: user.id,
      email: user.email,
      user_type: user.user_type,
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}