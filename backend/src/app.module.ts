import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { PenyakitModule } from './penyakit/penyakit.module';
import { GejalaModule } from './gejala/gejala.module';
import { AturanModule } from './aturan/aturan.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    CommonModule,
    AuthModule,
    PenyakitModule,
    GejalaModule,
    AturanModule,
    DiagnosisModule,
    UserModule,
  ],
})
export class AppModule {}
