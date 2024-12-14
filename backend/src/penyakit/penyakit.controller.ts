import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PenyakitService } from './penyakit.service';
import { ReqCreatePenyakit } from 'src/model/penyakit.model';
import { AuthGuard } from 'src/guards/authGuard';
import { WebResponse } from 'src/model/web.model';

@Controller('api/disease')
export class PenyakitController {
  constructor(private penyakitService: PenyakitService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() request: ReqCreatePenyakit,
  ): Promise<WebResponse<{ name: string }>> {
    await this.penyakitService.create(request);
    return {
      success: true,
      message: 'Berhasil menambahkan penyakit',
    };
  }
}
