import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class StatisticService {
  constructor(private prismaService: PrismaService) {}

  async getStatistic() {
    const disease = await this.prismaService.disease.count();
    const symptom = await this.prismaService.symptom.count();
    const user = await this.prismaService.user.count({
      where: {
        isAdmin: false,
      },
    });
    const diagnosis = await this.prismaService.diagnosis.count({
      where: {
        status: 'finish',
        user: {
          isAdmin: false,
        },
      },
    });

    //

    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 2);

    const diagnosisByMonth = await this.prismaService.diagnosis.groupBy({
      by: ['createdAt'],
      _count: {
        id: true,
      },
      where: {
        status: 'finish',
        createdAt: {
          gte: new Date(
            threeMonthsAgo.getFullYear(),
            threeMonthsAgo.getMonth(),
            1,
          ),
          lte: new Date(now.getFullYear(), now.getMonth() + 1, 0),
        },
      },
    });

    const groupedData = diagnosisByMonth.reduce((acc, curr) => {
      const date = new Date(curr.createdAt);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      acc[key] = (acc[key] || 0) + curr._count.id;
      return acc;
    }, {});

    const chartData = Array.from({ length: 3 }, (_, index) => {
      const month = new Date(
        now.getFullYear(),
        now.getMonth() - (2 - index),
        1,
      );
      const monthKey = `${month.getFullYear()}-${month.getMonth() + 1}`;
      const monthName = month.toLocaleDateString('id-ID', { month: 'long' });

      return {
        month: monthName,
        count: groupedData[monthKey] || 0,
      };
    });

    const symptomByDisease = await this.prismaService.rule.groupBy({
      by: ['diseaseId'],
      _count: {
        symptomId: true,
      },
    });

    const detailedSymptoms = await Promise.all(
      symptomByDisease.map(async (group) => {
        const disease = await this.prismaService.disease.findUnique({
          where: { id: group.diseaseId },
        });

        const symptoms = await this.prismaService.symptom.findMany({
          where: {
            rules: {
              some: { diseaseId: group.diseaseId },
            },
          },
        });

        return {
          disease: disease.name,
          symptoms: symptoms.map((s) => s.id),
        };
      }),
    );

    return {
      total: {
        disease,
        symptom,
        user,
        diagnosis,
      },
      last3month: chartData,
      detailedSymptoms,
    };
  }
}
