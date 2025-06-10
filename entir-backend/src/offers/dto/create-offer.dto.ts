import { IsNumber, IsPositive, IsString, IsOptional } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  @IsPositive() // Fiyat pozitif bir sayı olmalı
  price: number;

  @IsString()
  @IsOptional() // Notlar alanı zorunlu değil
  notes?: string;
}