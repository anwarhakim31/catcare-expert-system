import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { PenyakitModule } from './penyakit/penyakit.module';

@Module({
  controllers: [],
  providers: [],
  imports: [CommonModule, AuthModule, PenyakitModule],
})
export class AppModule {}
