import { Load } from 'src/loads/load.entity'; // Load entity'sini import ediyoruz
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany, // OneToMany'i import ediyoruz
} from 'typeorm';

export enum UserType {
  SHIPPER = 'SHIPPER', // Yük Sahibi
  CARRIER = 'CARRIER', // Nakliyeci
}

@Entity('users') // Veritabanındaki tablo adı 'users'
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  full_name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 20, unique: true })
  phone_number: string;

  @Column({ name: 'password_hash', length: 255 })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  user_type: UserType;

  @Column({ name: 'profile_picture_url', type: 'text', nullable: true })
  profilePictureUrl: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  // One-to-Many İlişkisi: Bir kullanıcı, birçok yük ilanına (loads) sahip olabilir.
  // (load) => load.shipper ifadesi, Load entity'sindeki 'shipper' alanıyla bu ilişkinin kurulduğunu belirtir.
  @OneToMany(() => Load, (load) => load.shipper)
  loads: Load[];
}