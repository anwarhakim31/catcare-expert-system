import { Inject, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { ReqCreatePenyakit } from 'src/model/penyakit.model';
import { PenyakitValidation } from './penyakit.validation';

export class PenyakitService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async create(request: ReqCreatePenyakit) {
    const penyakitRequest: ReqCreatePenyakit = this.validationService.validate(
      PenyakitValidation.CREATE,
      request,
    );

    const disease = await this.prismaService.disease.create({
      data: penyakitRequest,
    });

    return disease;
  }
}
