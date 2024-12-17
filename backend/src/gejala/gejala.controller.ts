import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GejalaService } from './gejala.service';
import {
  GejalaRespnse,
  ReqCreateGejala,
  ReqGetGejala,
  ReqPutGejala,
} from 'src/model/gejala.module';
import { AdminGuard } from 'src/guards/adminGuard';
import { AuthGuard } from 'src/guards/authGuard';
import { WebResponse } from 'src/model/web.model';
import { ReqDeletePenyakit } from 'src/model/penyakit.model';

@Controller('api/symptom')
export class GejalaController {
  constructor(private GejalaService: GejalaService) {}

  @Get()
  @HttpCode(200)
  async getAll(
    @Query('search') search?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    const request: ReqGetGejala = {
      search: search || '',
      page: page || 1,
      limit: limit || 10,
    };

    const result = await this.GejalaService.getAll(request);

    return {
      success: true,
      message: 'Berhasil mengambil data gejala',
      data: result.data,
      paging: result.paging,
    };
  }

  @Post()
  @UseGuards(AuthGuard, AdminGuard)
  async create(
    @Body() request: ReqCreateGejala,
  ): Promise<WebResponse<{ name: string }>> {
    await this.GejalaService.create(request);
    return {
      success: true,
      message: 'Berhasil menambahkan penyakit',
    };
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Put(':id')
  async put(
    @Body() request: ReqPutGejala,
    @Param() params: { id: string },
  ): Promise<WebResponse<GejalaRespnse>> {
    console.log(request);
    const result = await this.GejalaService.put(
      request,
      (params?.id as string) || '',
    );

    return {
      success: true,
      message: 'Berhasil mengedit data penyakit',
      data: result,
    };
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete()
  async Delete(
    @Body() request: ReqDeletePenyakit,
  ): Promise<WebResponse<{ name: string }>> {
    await this.GejalaService.delete(request);
    return {
      success: true,
      message: 'Berhasil menghapus penyakit',
    };
  }
}
