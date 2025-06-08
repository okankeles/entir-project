import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Load } from './load.entity';
import { CreateLoadDto } from './dto/create-load.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class LoadsService {
  constructor(
    @InjectRepository(Load)
    private loadsRepository: Repository<Load>,
  ) {}

  // Yeni yük ilanı oluşturma fonksiyonu
  async create(createLoadDto: CreateLoadDto, shipper: User): Promise<Load> {
    // Gelen DTO'dan ve token'dan gelen kullanıcı bilgisiyle yeni bir Load nesnesi oluştur
    const newLoad = this.loadsRepository.create({
      ...createLoadDto,
      shipper: shipper, // Bu yükün sahibini (ilanı vereni) ata
    });

    // Oluşturulan nesneyi veritabanına kaydet
    return this.loadsRepository.save(newLoad);
  }
}