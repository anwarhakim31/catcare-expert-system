import { Module } from '@nestjs/common';
import { GejalaService } from './gejala.service';
import { GejalaController } from './gejala.controller';

@Module({
  providers: [GejalaService],
  controllers: [GejalaController],
})
export class GejalaModule {}
