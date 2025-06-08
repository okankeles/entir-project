// Mobil uygulamadan gelecek olan ham veriyi temsil eder.
// Validasyonları sonra ekleyeceğiz (class-validator)
import { UserType } from '../../users/user.entity';

export class RegisterDto {
  full_name: string;
  email: string;
  phone_number: string;
  password: string; // Ham şifre
  user_type: UserType;
}