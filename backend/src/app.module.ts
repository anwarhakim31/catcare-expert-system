import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  controllers: [],
  providers: [],
  imports: [CommonModule, AuthModule],
})
export class AppModule {}
