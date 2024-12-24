import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisRespnse, ReqPatchDiagnosis } from 'src/model/diagnosis.model';
import { AuthGuard } from 'src/guards/authGuard';
import { User } from 'src/decorators/user.decorator';
import { AuthResponse } from 'src/model/auth.model';
import { WebResponse } from 'src/model/web.model';

@Controller('api/diagnosis')
export class DiagnosisController {
  constructor(private readonly dignosisService: DiagnosisService) {}
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
}
