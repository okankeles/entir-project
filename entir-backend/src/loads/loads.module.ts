import { Module, forwardRef } from '@nestjs/common';
import { LoadsService } from './loads.service';
import { LoadsController } from './loads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Load } from './load.entity';
import { OffersModule } from 'src/offers/offers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Load]), forwardRef(() => OffersModule)],
  controllers: [LoadsController],
  providers: [LoadsService],
  exports: [LoadsService],
})
export class LoadsModule {}