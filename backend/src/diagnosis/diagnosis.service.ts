import { HttpException, Injectable } from '@nestjs/common';
import { DiagnosisValidation } from './dignosis.validation';
import { PrismaService } from '../common/prisma.service';
import {
  DiagnosisRespnse,
  jsonDiagnosis,
  ReqDeleteDiagnosis,
  ReqGetDiagnosis,
  ReqPatchDiagnosis,
} from '../model/diagnosis.model';
import { AuthResponse } from '../model/auth.model';
import { ValidationService } from '../common/validation.service';

import { Paging } from '../model/web.model';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class DiagnosisService {
  constructor(
    private validationService: ValidationService,
    private prismaService: PrismaService,
  ) {}

  async getAll(
    request: ReqGetDiagnosis,
  ): Promise<{ data: DiagnosisRespnse[]; paging?: Paging }> {
    const ReqDiagnos: ReqGetDiagnosis = this.validationService.validate(
      DiagnosisValidation.GETALL,
      request,
    );

    const filter = [];

    if (ReqDiagnos.search) {
      filter.push({
        OR: [
          {
            username: {
              contains: ReqDiagnos.search,
            },
          },
        ],
      });
    }

    if (ReqDiagnos.status) {
      filter.push({
        status: ReqDiagnos.status,
      });
    }

    const diagnosis = await this.prismaService.diagnosis.findMany({
      where: {
        user: {
          isAdmin: false,
        },
        AND: filter,
      },
      skip: (ReqDiagnos.page - 1) * ReqDiagnos.limit,
      take: ReqDiagnos.limit,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await this.prismaService.diagnosis.count({
      where: {
        AND: filter,
      },
    });

    return {
      data: diagnosis.map((d) => ({
        ...d,
        disease: d.disease as unknown as JSON,
        symptoms: d.symptoms as unknown as [] | jsonDiagnosis[],
      })),
      paging: {
        page: ReqDiagnos.page,
        limit: ReqDiagnos.limit,
        total: total,
        totalPage: Math.ceil(total / ReqDiagnos.limit),
      },
    };
  }

  async delete(request: ReqDeleteDiagnosis) {
    const disease = await this.prismaService.diagnosis.deleteMany({
      where: {
        id: {
          in: request.selected,
        },
      },
    });

    if (disease.count == 0 || disease.count < request.selected.length) {
      throw new HttpException('Diagnosis tidak ditemukan', 404);
    }

    return disease;
  }

  async create(user: AuthResponse): Promise<DiagnosisRespnse> {
    const expired = Math.floor(new Date().getTime() / 1000) + 10 * 60;

    const diagnosis = await this.prismaService.diagnosis.create({
      data: {
        username: user.username,
        expired: expired,
        scor: 0,
        symptoms: [],
        status: 'pending',
        disease: [],
      },
    });

    return {
      ...diagnosis,
      disease: diagnosis.disease as unknown as JSON,
      symptoms: diagnosis.symptoms as unknown as [] | jsonDiagnosis[],
    };
  }

  async get(id: string) {
    const diagnosis = await this.prismaService.diagnosis.findUnique({
      where: {
        id: id,
      },
    });

    if (!diagnosis) {
      throw new HttpException('Diagnosis tidak ditemukan', 404);
    }

    const now = new Date().getTime();
    const expired = new Date(diagnosis.expired * 1000).getTime();

    //expired
    if (expired < now && diagnosis.status === 'pending') {
      const updated = await this.prismaService.diagnosis.update({
        where: {
          id: id,
        },
        data: {
          expired: 0,
          status: 'cancel',
        },
      });

      return {
        ...updated,
        disease: updated.disease as unknown as JSON,
        symptoms: updated.symptoms as unknown as [] | jsonDiagnosis[],
      };
    }

    //finish

    if (diagnosis.status === 'finish') {
      const disease = await this.prismaService.disease.findMany({
        where: {
          id: {
            in: diagnosis.disease as string[],
          },
        },
      });

      return {
        ...diagnosis,
        disease: disease as unknown as JSON,
        symptoms: diagnosis.symptoms as unknown as [] | jsonDiagnosis[],
      };
    }

    return {
      ...diagnosis,
      disease: diagnosis.disease as unknown as JSON,
      symptoms: diagnosis.symptoms as unknown as [] | jsonDiagnosis[],
    };
  }

  async getDiagnosis(user: AuthResponse): Promise<DiagnosisRespnse[]> {
    try {
      const diagnosis = await this.prismaService.diagnosis.findMany({
        where: {
          username: user.username,
          status: 'finish',
        },

        orderBy: {
          createdAt: 'desc',
        },
      });

      return Promise.all(
        diagnosis.map(async (d) => {
          const disease = await this.prismaService.disease.findMany({
            where: {
              id: {
                in: d.disease as string[],
              },
            },
          });

          return {
            ...d,
            disease: disease as unknown as JSON,
            symptoms: d.symptoms as unknown as [] | jsonDiagnosis[],
            expired: d.expired,
            status: d.status,
            createdAt: d.createdAt,
            username: d.username,
          };
        }),
      );
    } catch (error) {
      console.log(error);
    }
  }

  async patch(
    id: string,
    request: ReqPatchDiagnosis,
  ): Promise<DiagnosisRespnse> {
    const reqDiagnosis: ReqPatchDiagnosis = this.validationService.validate(
      DiagnosisValidation.PATCH,
      request,
    );

    //logic//
    const answer = reqDiagnosis.symptoms
      .filter((s: jsonDiagnosis) => s.answer)
      .map((s: jsonDiagnosis) => s.id);

    const totalSymptomOfDisease = await this.prismaService.rule.groupBy({
      by: ['diseaseId'],
      where: {
        symptomId: { in: answer },
      },
      _count: {
        symptomId: true,
      },
    });

    const totalPerDisease = await this.prismaService.rule.groupBy({
      by: ['diseaseId'],
      _count: {
        symptomId: true,
      },
    });

    const score = totalSymptomOfDisease.map((disease) => {
      const total =
        totalPerDisease.find((total) => total.diseaseId === disease.diseaseId)
          ?._count.symptomId || 1;
      return {
        disease: disease.diseaseId,
        scor: Math.round((disease._count.symptomId / total) * 100),
      };
    });

    const maxScore = Math.max(...score.map((s) => s.scor));

    //logic//

    if (reqDiagnosis.status === 'finish') {
      const disease = score
        .filter((s) => s.scor === maxScore)
        .map((s) => s.disease);

      const updated = await this.prismaService.diagnosis.update({
        where: {
          id,
        },
        data: {
          ...reqDiagnosis,
          scor: maxScore,
          disease,
          status: reqDiagnosis.status,
        },
      });
      if (Array.isArray(updated.disease) && updated.disease.length > 0) {
        await this.prismaService.disease.updateMany({
          where: {
            id: {
              in: updated.disease as string[],
            },
          },
          data: {
            modus: {
              increment: 1,
            },
          },
        });
      }

      const diseases = await this.prismaService.disease.findMany({
        where: {
          id: {
            in: updated.disease as string[],
          },
        },
      });

      return {
        ...updated,
        disease: diseases as unknown as JSON,
        symptoms: updated.symptoms as unknown as [] | jsonDiagnosis[],
      };
    }

    const diagnosis = await this.prismaService.diagnosis.update({
      where: {
        id,
      },
      data: {
        ...reqDiagnosis,
        scor: maxScore,
        disease: [],
        status: reqDiagnosis.status,
      },
    });

    return {
      ...diagnosis,
      disease: diagnosis.disease as unknown as JSON,
      symptoms: diagnosis.symptoms as unknown as [] | jsonDiagnosis[],
    };
  }

  @Cron('0 0 * * *')
  async cornJob() {
    await this.prismaService.diagnosis.updateMany({
      where: {
        expired: {
          lte: Math.floor(new Date().getTime() / 1000),
        },
        status: 'pending',
      },
      data: {
        status: 'cancel',
      },
    });

    return true;
  }
}
