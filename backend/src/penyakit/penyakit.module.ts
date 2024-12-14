import { Module } from '@nestjs/common';
import { PenyakitController } from './penyakit.controller';
import { PenyakitService } from './penyakit.service';

@Module({
  controllers: [PenyakitController],
  providers: [PenyakitService],
})
export class PenyakitModule {}
