import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}