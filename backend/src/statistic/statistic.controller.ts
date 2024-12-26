import { Controller, Get, HttpCode } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('/api/statistic')
export class StatisticController {
  constructor(private statisticService: StatisticService) {}

  @Get()
  @HttpCode(200)
  async getStatistic() {
    const statistic = await this.statisticService.getStatistic();
    return {
      success: true,
      message: 'Berhasil mengambil data',
      data: statistic,
    };
  }
  @Get('/home')
  @HttpCode(200)
  async getStatisticHome() {
    const statistic = await this.statisticService.getStatistic();
    return {
      success: true,
      message: 'Berhasil mengambil data',
      data: statistic,
    };
  }
}
