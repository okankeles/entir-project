import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { LoadsService } from './loads.service';
import { CreateLoadDto } from './dto/create-load.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserType } from 'src/users/user.entity';

// Bu controller'daki tüm endpoint'ler için JWT kontrolü zorunlu olsun
@UseGuards(AuthGuard('jwt')) 
@Controller('loads')
export class LoadsController {
  constructor(private readonly loadsService: LoadsService) {}

  // Sadece 'SHIPPER' rolündeki kullanıcılar bu endpoint'i kullanabilsin
  @UseGuards(RolesGuard)
  @Roles(UserType.SHIPPER)
  @Post()
  create(@Body() createLoadDto: CreateLoadDto, @Request() req) {
    // req.user, JWT stratejisinden gelen, giriş yapmış kullanıcı bilgisidir.
    const shipper = req.user;
    return this.loadsService.create(createLoadDto, shipper);
  }
}