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
import { AturanService } from './aturan.service';
import { AuthGuard } from 'src/guards/authGuard';
import { AdminGuard } from 'src/guards/adminGuard';
import {
  AturanRespnse,
  ReqCreateAturan,
  ReqDeleteAturan,
  ReqGetAturan,
  ReqPutAturan,
} from 'src/model/aturan.model';
import { WebResponse } from 'src/model/web.model';

@Controller('api/rules')
export class AturanController {
  constructor(private aturanService: AturanService) {}

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Get()
  async getAll(
    @Query('search') search?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<WebResponse<AturanRespnse[]>> {
    const request: ReqGetAturan = {
      search: search || '',
      page: page || 1,
      limit: limit || 10,
    };

    const aturan = await this.aturanService.getAll(request);
    return {
      success: true,
      message: 'Berhasil mengambil data aturan',
      data: aturan.data,
      paging: aturan.paging,
    };
  }

  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(201)
  @Post()
  async create(
    @Body() request: ReqCreateAturan,
  ): Promise<WebResponse<{ name: string }>> {
    await this.aturanService.create(request);

    return {
      success: true,
      message: 'Berhasil menambahkan aturan',
    };
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Put(':id')
  async put(
    @Body() request: ReqPutAturan,
    @Param() params: { id: string },
  ): Promise<WebResponse<AturanRespnse>> {
    const result = await this.aturanService.put(
      request,
      (params?.id as string) || '',
    );

    return {
      success: true,
      message: 'Berhasil mengedit aturan',
      data: result,
    };
  }

  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(200)
  @Delete()
  async delete(
    @Body() request: ReqDeleteAturan,
  ): Promise<WebResponse<{ name: string }>> {
    await this.aturanService.delete(request);

    return {
      success: true,
      message: 'Berhasil menghapus aturan',
    };
  }
}
