import {Controller, Post, Body, UseGuards, Request, Get, Param, ParseIntPipe} from '@nestjs/common';
import { LoadsService } from './loads.service';
import { CreateLoadDto } from './dto/create-load.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserType } from 'src/users/user.entity';

// Bu controller'daki tüm endpoint'ler için JWT kimlik doğrulaması zorunludur.
@UseGuards(AuthGuard('jwt'))
@Controller('loads')
export class LoadsController {
  constructor(private readonly loadsService: LoadsService) {}

  // POST /loads - Yeni bir yük ilanı oluşturur.
  // Sadece 'SHIPPER' rolündeki kullanıcılar bu endpoint'i kullanabilir.
  @UseGuards(RolesGuard)
  @Roles(UserType.SHIPPER)
  @Post()
  create(@Body() createLoadDto: CreateLoadDto, @Request() req) {
    const shipper = req.user;
    return this.loadsService.create(createLoadDto, shipper);
  }

  // GET /loads - Tüm yük ilanlarını listeler.
  // Giriş yapmış tüm kullanıcılar (SHIPPER ve CARRIER) erişebilir.
  @Get()
  findAll() {
    return this.loadsService.findAll();
  }

  // GET /loads/:id - Belirli bir ID'ye sahip yük ilanının detaylarını getirir.
  // Giriş yapmış tüm kullanıcılar erişebilir.
  // ParseIntPipe, URL'den gelen 'id' parametresinin bir sayıya dönüştürülmesini sağlar.
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.loadsService.findOne(id);
  }
}