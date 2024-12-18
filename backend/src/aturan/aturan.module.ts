import { Module } from '@nestjs/common';
import { AturanService } from './aturan.service';
import { AturanController } from './aturan.controller';

@Module({
  providers: [AturanService],
  controllers: [AturanController]
})
export class AturanModule {}
