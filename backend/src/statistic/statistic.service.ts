import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class StatisticService {
  constructor(private prismaService: PrismaService) {}

  async getStatisticHome() {
    const mostDiagnosed = await this.prismaService.diagnosis.count({
      where: {
        status: 'finish',
      },
    });
  }
}
