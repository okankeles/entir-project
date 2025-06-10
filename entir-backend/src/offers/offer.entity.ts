import { Load } from 'src/loads/load.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

export enum OfferStatus {
  PENDING = 'PENDING',   // Teklif yapıldı, cevap bekleniyor
  ACCEPTED = 'ACCEPTED', // Teklif kabul edildi
  REJECTED = 'REJECTED', // Teklif reddedildi
}

@Entity('offers')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number; // Teklif edilen fiyat

  @Column({ type: 'text', nullable: true })
  notes: string; // Nakliyecinin ek notları

  @Column({
    type: 'enum',
    enum: OfferStatus,
    default: OfferStatus.PENDING,
  })
  status: OfferStatus;

  // Birçok teklif, bir yüke ait olabilir
  @ManyToOne(() => Load, (load) => load.offers)
  load: Load;

  // Birçok teklif, bir kullanıcı (carrier) tarafından yapılabilir
  @ManyToOne(() => User, (user) => user.offers)
  carrier: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}