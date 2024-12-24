import {
  HttpException,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { DiagnosisValidation } from './dignosis.validation';
import { PrismaService } from 'src/common/prisma.service';
import {
  DiagnosisRespnse,
  jsonDiagnosis,
  ReqPatchDiagnosis,
} from 'src/model/diagnosis.model';
import { AuthResponse } from 'src/model/auth.model';
import { ValidationService } from 'src/common/validation.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class DiagnosisService {
  constructor(
    private validationService: ValidationService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: LoggerService,
  ) {}

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
}
