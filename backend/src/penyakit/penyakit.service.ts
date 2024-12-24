import { HttpException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  PenyakitRespnse,
  ReqCreatePenyakit,
  ReqDeletePenyakit,
  ReqGetPenyakit,
  ReqPutPenyakit,
} from 'src/model/penyakit.model';
import { PenyakitValidation } from './penyakit.validation';
import { Paging } from 'src/model/web.model';

@Injectable()
export class PenyakitService {
  constructor(
    private validationService: ValidationService,

    private prismaService: PrismaService,
  ) {}

  async getAll(
    request: ReqGetPenyakit,
  ): Promise<{ data: PenyakitRespnse[]; paging?: Paging }> {
    const getReq: ReqGetPenyakit = this.validationService.validate(
      PenyakitValidation.GETALL,
      request,
    );

    const filter = [];

    if (getReq.search) {
      filter.push({
        name: {
          contains: getReq.search,
        },
      });
    }

    if (!getReq.limit) {
      const gejala = await this.prismaService.disease.findMany({
        where: {
          AND: filter,
        },
        orderBy: {
          id: 'asc',
        },
      });

      return { data: gejala };
    }

    const penyakit = await this.prismaService.disease.findMany({
      where: {
        AND: filter,
      },
      skip: (getReq.page - 1) * getReq.limit,
      take: getReq.limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.prismaService.disease.count({
      where: {
        AND: filter,
      },
    });

    return {
      data: penyakit,
      paging: {
        limit: getReq.limit,
        totalPage: Math.ceil(total / getReq.limit),
        page: getReq.page,
        total: total,
      },
    };
  }

  async get(id: string): Promise<PenyakitRespnse> {
    const disease = await this.prismaService.disease.findUnique({
      where: {
        id: id,
      },
    });

    if (!disease) {
      throw new HttpException('Penyakit tidak ditemukan', 404);
    }

    return disease;
  }

  async create(request: ReqCreatePenyakit) {
    const penyakitRequest: ReqCreatePenyakit = this.validationService.validate(
      PenyakitValidation.CREATE,
      request,
    );

    const totalDiseaseWithSameId = await this.prismaService.disease.count({
      where: {
        id: penyakitRequest.id,
      },
    });

    if (totalDiseaseWithSameId > 0) {
      throw new HttpException('ID penyakit sudah digunakan', 400);
    }

    const totalDiseaseWithSameName = await this.prismaService.disease.count({
      where: {
        name: penyakitRequest.name,
      },
    });

    if (totalDiseaseWithSameName > 0) {
      throw new HttpException('Nama penyakit sudah digunakan', 400);
    }

    const disease = await this.prismaService.disease.create({
      data: {
        ...penyakitRequest,
        id: penyakitRequest.id.toUpperCase(),
      },
    });

    return disease;
  }

  async put(request: ReqPutPenyakit, id: string) {
    const penyakitRequest: ReqPutPenyakit = this.validationService.validate(
      PenyakitValidation.PUT,
      request,
    );

    const totalDiseaseWithSameId = await this.prismaService.disease.count({
      where: {
        id: penyakitRequest.id,
        NOT: {
          id: id,
        },
      },
    });

    if (totalDiseaseWithSameId > 0) {
      throw new HttpException('ID penyakit sudah digunakan', 400);
    }

    const totalDiseaseWithSameName = await this.prismaService.disease.count({
      where: {
        name: penyakitRequest.name,
        NOT: {
          id: id,
        },
      },
    });

    if (totalDiseaseWithSameName > 0) {
      throw new HttpException('Nama penyakit sudah digunakan', 400);
    }

    const disease = await this.prismaService.disease.update({
      where: {
        id: id,
      },
      data: {
        ...penyakitRequest,
        id: penyakitRequest.id.toUpperCase(),
      },
    });

    if (!disease) {
      throw new HttpException('Penyakit tidak ditemukan', 404);
    }

    return disease;
  }

  async delete(request: ReqDeletePenyakit) {
    const disease = await this.prismaService.disease.deleteMany({
      where: {
        id: {
          in: request.selected,
        },
      },
    });

    if (disease.count == 0 || disease.count < request.selected.length) {
      throw new HttpException('Penyakit tidak ditemukan', 404);
    }

    return disease;
  }
}
