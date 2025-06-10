import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from 'src/users/user.entity';
import { Load, LoadStatus } from 'src/loads/load.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
  ) {}

  async createOffer(
    createOfferDto: CreateOfferDto,
    load: Load,
    carrier: User,
  ): Promise<Offer> {
    // İş kurallarını kontrol et
    if (load.shipper.id === carrier.id) {
      throw new BadRequestException('Kendi ilanınıza teklif veremezsiniz.');
    }

    if (load.status !== LoadStatus.PENDING) {
      throw new BadRequestException('Bu ilana artık teklif verilemez.');
    }

    const newOffer = this.offersRepository.create({
      ...createOfferDto,
      load: load,
      carrier: carrier,
    });

    return this.offersRepository.save(newOffer);
  }
}