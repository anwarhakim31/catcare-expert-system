import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from '../common/validation.service';

import { Paging } from 'src/model/web.model';
import { GejalaValidation } from './gejala.validation';
import {
  GejalaRespnse,
  ReqCreateGejala,
  ReqDeleteGejala,
  ReqGetGejala,
  ReqPutGejala,
} from 'src/model/gejala.module';

@Injectable()
export class GejalaService {
  constructor(
    private validationService: ValidationService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
  ) {}

  async getAll(
    request: ReqGetGejala,
  ): Promise<{ data: GejalaRespnse[]; paging?: Paging }> {
    const getReq: ReqGetGejala = this.validationService.validate(
      GejalaValidation.GETALL,
      request,
    );

    const filter = [];

    if (getReq.search) {
      filter.push({
        OR: [
          {
            id: {
              contains: getReq.search,
            },
          },
          {
            symptom: {
              contains: getReq.search,
            },
          },
        ],
      });
    }

    if (!getReq.limit) {
      const gejala = await this.prismaService.symptom.findMany({
        where: {
          AND: filter,
        },
        orderBy: {
          id: 'asc',
        },
      });

      return { data: gejala };
    }

    const gejala = await this.prismaService.symptom.findMany({
      where: {
        AND: filter,
      },
      skip: (getReq.page - 1) * getReq.limit,
      take: getReq.limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.prismaService.symptom.count({
      where: {
        AND: filter,
      },
    });

    return {
      data: gejala,
      paging: {
        limit: getReq.limit,
        totalPage: Math.ceil(total / getReq.limit),
        page: getReq.page,
        total: total,
      },
    };
  }

  async create(request: ReqCreateGejala) {
    const gejalaRequest: ReqCreateGejala = this.validationService.validate(
      GejalaValidation.CREATE,
      request,
    );

    const totalsymptomWithSameId = await this.prismaService.symptom.count({
      where: {
        id: gejalaRequest.id,
      },
    });

    if (totalsymptomWithSameId > 0) {
      throw new HttpException('ID penyakit sudah digunakan', 400);
    }

    const symptom = await this.prismaService.symptom.create({
      data: {
        id: gejalaRequest.id.toUpperCase(),
        symptom: gejalaRequest.symptom,
      },
    });

    return symptom;
  }

  async put(request: ReqPutGejala, id: string) {
    const gejalaRequest: ReqPutGejala = this.validationService.validate(
      GejalaValidation.PUT,
      request,
    );

    const totalsymptomWithSameId = await this.prismaService.symptom.count({
      where: {
        id: gejalaRequest.id,
        NOT: {
          id: id,
        },
      },
    });

    if (totalsymptomWithSameId > 0) {
      throw new HttpException('ID penyakit sudah digunakan', 400);
    }

    const symptom = await this.prismaService.symptom.update({
      where: {
        id: id,
      },
      data: {
        id: gejalaRequest.id.toUpperCase(),
        symptom: gejalaRequest.symptom,
      },
    });

    if (!symptom) {
      throw new HttpException('Penyakit tidak ditemukan', 404);
    }

    return symptom;
  }

  async delete(request: ReqDeleteGejala) {
    const symptom = await this.prismaService.symptom.deleteMany({
      where: {
        id: {
          in: request.selected,
        },
      },
    });

    if (symptom.count == 0 || symptom.count < request.selected.length) {
      throw new HttpException('Penyakit tidak ditemukan', 404);
    }

    return symptom;
  }
}
