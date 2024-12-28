import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import {
  DiagnosisRespnse,
  ReqDeleteDiagnosis,
  ReqGetDiagnosis,
  ReqPatchDiagnosis,
} from 'src/model/diagnosis.model';
import { AuthGuard } from 'src/guards/authGuard';
import { User } from 'src/decorators/user.decorator';
import { AuthResponse } from 'src/model/auth.model';
import { WebResponse } from 'src/model/web.model';
import { AdminGuard } from 'src/guards/adminGuard';

@Controller('api/diagnosis')
export class DiagnosisController {
  constructor(private readonly dignosisService: DiagnosisService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(200)
  @Get()
  async getAll(
    @Query('search') search?: string,
    @Query(`status`) status?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<WebResponse<DiagnosisRespnse[]>> {
    const request: ReqGetDiagnosis = {
      search: search || '',
      page: page,
      limit: limit,
      status: status,
    };

    const result = await this.dignosisService.getAll(request);

    return {
      success: true,
      message: 'Berhasil mengambil data penyakit',
      data: result.data,
      paging: result.paging,
    };
  }

  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(200)
  @Delete()
  async delete(
    @Body() request: ReqDeleteDiagnosis,
  ): Promise<WebResponse<{ name: string }>> {
    await this.dignosisService.delete(request);

    return {
      success: true,
      message: 'Berhasil mengedit data penyakit',
    };
  }

  @Get('user')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async getDianosisUser(
    @User() user: AuthResponse,
  ): Promise<WebResponse<DiagnosisRespnse[]>> {
    const result = await this.dignosisService.getDiagnosis(user);

    return {
      success: true,
      message: 'Berhasil mengambil data diagnosis user',
      data: result,
    };
  }
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @User() user: AuthResponse,
  ): Promise<WebResponse<DiagnosisRespnse>> {
    const result = await this.dignosisService.create(user);

    return {
      success: true,
      message: 'Berhasil membuat diagnosis',
      data: result,
    };
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async get(
    @Param() params: { id: string },
  ): Promise<WebResponse<DiagnosisRespnse>> {
    const result = await this.dignosisService.get(params.id);

    return {
      success: true,
      message: 'Berhasil mengambil data diagnosis',
      data: result,
    };
  }

  @Patch('/:id')
  @UseGuards(AuthGuard)
  async patch(
    @Param() params: { id: string },
    @Body() request: ReqPatchDiagnosis,
  ): Promise<WebResponse<DiagnosisRespnse>> {
    const result = await this.dignosisService.patch(params.id, request);

    return {
      success: true,
      message: 'Berhasil membuat diagnosis',
      data: result,
    };
  }

  @Get('/cron')
  async cornJob() {
    await this.dignosisService.cornJob();
  }
}
