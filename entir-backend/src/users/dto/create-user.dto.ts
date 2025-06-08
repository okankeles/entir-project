// Bu DTO, auth servisinden gelecek veriyi temsil eder.
// Validasyon paketlerini daha sonra ekleyebiliriz.
import { UserType } from '../user.entity';

export class CreateUserDto {
  full_name: string;
  email: string;
  phone_number: string;
  passwordHash: string; // Dikkat: Buraya hash'lenmiş şifre gelecek
  user_type: UserType;
}