import { Offer } from 'src/offers/offer.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export enum LoadStatus {
  PENDING = 'PENDING', // Beklemede
  ASSIGNED = 'ASSIGNED', // Atandı
  IN_TRANSIT = 'IN_TRANSIT', // Yolda
  COMPLETED = 'COMPLETED', // Tamamlandı
  CANCELLED = 'CANCELLED', // İptal Edildi
}

@Entity('loads')
export class Load {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string; // Yükleme Adresi (örn: "İstanbul, Tuzla")

  @Column()
  destination: string; // Teslimat Adresi (örn: "Ankara, Sincan")

  @Column('decimal')
  weight: number; // Ağırlık (ton)

  @Column()
  description: string; // Yük Açıklaması (örn: "20 palet seramik")

  @Column({
    type: 'enum',
    enum: LoadStatus,
    default: LoadStatus.PENDING,
  })
  status: LoadStatus;

  @ManyToOne(() => User, (user) => user.loads) // Bir yükün bir sahibi (shipper) olur
  shipper: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Offer, (Offer) => Offer.load)
  offers: Offer[]; // Bir yükün birden fazla teklifi olabilir
}