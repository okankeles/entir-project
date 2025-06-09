import { Injectable, NotFoundException } from '@nestjs/common';
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

  /**
   * Yeni bir yük ilanı oluşturur ve veritabanına kaydeder.
   * @param createLoadDto - Yük ilanı oluşturmak için gerekli veriler (origin, destination vb.)
   * @param shipper - İlanı oluşturan, giriş yapmış kullanıcı (User nesnesi)
   * @returns Oluşturulan ve kaydedilen Load nesnesi
   */
  async create(createLoadDto: CreateLoadDto, shipper: User): Promise<Load> {
    const newLoad = this.loadsRepository.create({
      ...createLoadDto,
      shipper: shipper,
    });

    return this.loadsRepository.save(newLoad);
  }

  /**
   * Sistemdeki tüm yük ilanlarını bulur.
   * @returns Bir Load nesneleri dizisi (Array<Load>)
   */
  async findAll(): Promise<Load[]> {
    // İlanları, ilişkili olduğu 'shipper' bilgisiyle birlikte getir.
    // En yeniden en eskiye doğru (oluşturulma tarihine göre) sırala.
    return this.loadsRepository.find({
      relations: {
        shipper: true, // İlanı veren kullanıcının bilgilerini de getir
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  /**
   * Verilen ID'ye sahip tek bir yük ilanını bulur.
   * @param id - Bulunacak yük ilanının ID'si
   * @returns Bulunan Load nesnesi
   * @throws {NotFoundException} Eğer verilen ID'ye sahip bir yük bulunamazsa
   */
  async findOne(id: number): Promise<Load> {
    const load = await this.loadsRepository.findOne({
      where: { id: id },
      relations: {
        shipper: true,
      },
    });

    if (!load) {
      throw new NotFoundException(`Bu ID'ye sahip yük bulunamadı: ${id}`);
    }

    return load;
  }
}