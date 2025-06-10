import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { LoadsService } from './loads.service';
import { CreateLoadDto } from './dto/create-load.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User, UserType } from 'src/users/user.entity';
import { OffersService } from 'src/offers/offers.service';
import { CreateOfferDto } from 'src/offers/dto/create-offer.dto';

/**
 * Bu controller, yük ilanları (loads) ile ilgili tüm işlemleri yönetir.
 * Controller seviyesinde @UseGuards(AuthGuard('jwt')) kullanıldığı için,
 * buradaki tüm endpoint'lere erişim için geçerli bir JWT token gereklidir.
 */
@UseGuards(AuthGuard('jwt'))
@Controller('loads')
export class LoadsController {
  /**
   * Gerekli servisleri dependency injection ile içeri alıyoruz.
   * @param loadsService - Yük işlemleri için (oluşturma, bulma vb.).
   * @param offersService - Teklif işlemleri için.
   */
  constructor(
    private readonly loadsService: LoadsService,
    private readonly offersService: OffersService,
  ) {}

  /**
   * POST /loads
   * Yeni bir yük ilanı oluşturur.
   * Sadece 'SHIPPER' rolündeki kullanıcılar erişebilir.
   * @param createLoadDto - İstek body'sinden gelen yük bilgileri.
   * @param req - İstek objesi, JWT'den çözülen kullanıcı bilgisini içerir.
   */
  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserType.SHIPPER)
  create(@Body() createLoadDto: CreateLoadDto, @Request() req) {
    const shipper: User = req.user;
    return this.loadsService.create(createLoadDto, shipper);
  }

  /**
   * GET /loads
   * Sistemdeki tüm yük ilanlarını listeler.
   * Giriş yapmış tüm kullanıcılar erişebilir.
   */
  @Get()
  findAll() {
    return this.loadsService.findAll();
  }

  /**
   * GET /loads/:id
   * Verilen ID'ye sahip tek bir yük ilanının detaylarını getirir.
   * @param id - URL'den gelen ve sayıya çevrilen yük ID'si.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.loadsService.findOne(id);
  }

  /**
   * POST /loads/:id/offers
   * Belirli bir yük ilanına yeni bir teklif oluşturur.
   * Sadece 'CARRIER' rolündeki kullanıcılar erişebilir.
   * @param loadId - Teklif yapılacak yükün ID'si.
   * @param createOfferDto - İstek body'sinden gelen teklif bilgileri (fiyat, notlar).
   * @param req - İstek objesi, teklifi yapan 'CARRIER' kullanıcısının bilgisini içerir.
   */
  @Post(':id/offers')
  @UseGuards(RolesGuard)
  @Roles(UserType.CARRIER)
  async createOfferForLoad(
    @Param('id', ParseIntPipe) loadId: number,
    @Body() createOfferDto: CreateOfferDto,
    @Request() req,
  ) {
    const carrier: User = req.user;
    // Önce teklif verilecek yükün var olup olmadığını kontrol edelim.
    // findOne metodu, yük yoksa zaten 404 fırlatacaktır.
    const load = await this.loadsService.findOne(loadId);

    // Yükü ve teklifi yapan kullanıcıyı teklif oluşturma servisine gönderiyoruz.
    return this.offersService.createOffer(createOfferDto, load, carrier);
  }
}