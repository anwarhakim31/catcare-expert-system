import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PenyakitService } from './penyakit.service';
import {
  PenyakitRespnse,
  ReqCreatePenyakit,
  ReqDeletePenyakit,
  ReqGetPenyakit,
  ReqPutPenyakit,
} from 'src/model/penyakit.model';
import { AuthGuard } from 'src/guards/authGuard';
import { WebResponse } from 'src/model/web.model';
import { AdminGuard } from 'src/guards/adminGuard';

@Controller('api/disease')
export class PenyakitController {
  constructor(private penyakitService: PenyakitService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(
    @Query('search') search?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<WebResponse<PenyakitRespnse[]>> {
    const request: ReqGetPenyakit = {
      search: search || '',
      page: page,
      limit: limit,
    };

    const result = await this.penyakitService.getAll(request);

    return {
      success: true,
      message: 'Berhasil mengambil data penyakit',
      data: result.data,
      paging: result.paging,
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async get(
    @Param() params: { id: string },
  ): Promise<WebResponse<PenyakitRespnse>> {
    const result = await this.penyakitService.get((params?.id as string) || '');

    return {
      success: true,
      message: 'Berhasil mengambil data penyakit',
      data: result,
    };
  }

  @UseGuards(AuthGuard, AdminGuard)
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

  @UseGuards(AuthGuard, AdminGuard)
  @Put(':id')
  async put(
    @Body() request: ReqPutPenyakit,
    @Param() params: { id: string },
  ): Promise<WebResponse<PenyakitRespnse>> {
    console.log(request);
    const result = await this.penyakitService.put(
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
    await this.penyakitService.delete(request);
    return {
      success: true,
      message: 'Berhasil menghapus penyakit',
    };
  }
}
