import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  ReqCreateAturan,
  ReqDeleteAturan,
  ReqGetAturan,
  ReqPutAturan,
} from 'src/model/aturan.model';
import { AturanValidation } from './aturan.validation';

@Injectable()
export class AturanService {
  constructor(
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async getAll(request: ReqGetAturan) {
    const filter = [];

    if (request.search) {
      filter.push({
        OR: [
          {
            symptomId: {
              contains: request.search,
            },
          },
          {
            diseaseId: {
              contains: request.search,
            },
          },
        ],
      });
    }

    const aturan = await this.prismaService.rule.findMany({
      where: {
        AND: filter,
      },
      include: {
        symptom: true,
        disease: true,
      },
      skip: (request.page - 1) * request.limit,
      take: request.limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.prismaService.rule.count({
      where: {
        AND: filter,
      },
    });

    return {
      data: aturan,
      paging: {
        total: total,
        page: request.page,
        limit: request.limit,
        totalPage: Math.ceil(total / request.limit),
      },
    };
  }

  async create(request: ReqCreateAturan) {
    const aturanRequest: ReqCreateAturan = this.validationService.validate(
      AturanValidation.CREATE,
      request,
    );

    const total = await this.prismaService.rule.count({
      where: {
        symptomId: aturanRequest.symptomId,
        diseaseId: aturanRequest.diseaseId,
      },
    });

    if (total > 0) {
      throw new HttpException('Aturan sudah ada', 400);
    }

    const aturan = await this.prismaService.rule.create({
      data: aturanRequest,
    });

    return aturan;
  }

  async put(request: ReqPutAturan, id: string) {
    const aturanRequest: ReqPutAturan = this.validationService.validate(
      AturanValidation.PUT,
      request,
    );

    const totalsymptomWithSame = await this.prismaService.rule.count({
      where: {
        symptomId: aturanRequest.symptomId,
        diseaseId: aturanRequest.diseaseId,
        NOT: {
          id: id,
        },
      },
    });

    if (totalsymptomWithSame > 0) {
      throw new HttpException('Aturan sudah ada', 400);
    }

    const symptom = await this.prismaService.rule.update({
      where: {
        id: id,
      },
      data: {
        symptomId: aturanRequest.symptomId,
        diseaseId: aturanRequest.diseaseId,
      },
    });

    if (!symptom) {
      throw new HttpException('Aturan tidak ditemukan', 404);
    }

    return symptom;
  }

  async delete(request: ReqDeleteAturan) {
    const symptom = await this.prismaService.rule.deleteMany({
      where: {
        id: {
          in: request.selected,
        },
      },
    });

    if (symptom.count == 0 || symptom.count < request.selected.length) {
      throw new HttpException('Aturan tidak ditemukan', 404);
    }

    return symptom;
  }
}
