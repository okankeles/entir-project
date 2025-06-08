import { IsString, IsNotEmpty, IsNumber, Min, IsEnum } from 'class-validator';

export class CreateLoadDto {
  @IsString()
  @IsNotEmpty()
  origin: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsNumber()
  @Min(0.1) // Minimum ağırlık 0.1 ton olabilir
  weight: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}