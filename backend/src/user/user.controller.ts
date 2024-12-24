import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  ParseIntPipe,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ReqDeletePengguna,
  ReqEditPassword,
  ReqEditUser,
  ReqGetAllUser,
  ReqPutPengguna,
  UserResponse,
} from 'src/model/user.model';
import { AuthGuard } from 'src/guards/authGuard';
import { User } from 'src/decorators/user.decorator';
import { AuthResponse } from 'src/model/auth.model';
import { WebResponse } from 'src/model/web.model';
import { AdminGuard } from 'src/guards/adminGuard';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard, AdminGuard)
  @HttpCode(200)
  @Get()
  async getAll(
    @Query('search') search?: string,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<WebResponse<UserResponse[]>> {
    const request: ReqGetAllUser = {
      search: search || '',
      page: page,
      limit: limit,
    };

    const result = await this.userService.getAll(request);

    return {
      success: true,
      message: 'Berhasil mengambil data penyakit',
      data: result.data,
      paging: result.paging,
    };
  }

  @Delete()
  @HttpCode(200)
  @UseGuards(AuthGuard, AdminGuard)
  async Delete(
    @Body() request: ReqDeletePengguna,
  ): Promise<WebResponse<{ name: string }>> {
    await this.userService.delete(request);

    return {
      success: true,
      message: 'Berhasil menghapus data pengguna',
    };
  }

  @Put()
  @HttpCode(200)
  @UseGuards(AuthGuard, AdminGuard)
  async Put(
    @Body() request: ReqPutPengguna,
  ): Promise<WebResponse<{ name: string }>> {
    await this.userService.put(request);

    return {
      success: true,
      message: 'Berhasil mengeubah  data pengguna',
    };
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Patch('/profile')
  async editProfile(@Body() request: ReqEditUser): Promise<UserResponse> {
    return this.userService.editProfile(request);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Patch('/password')
  async changePassword(
    @Body() request: ReqEditPassword,
    @User() user: AuthResponse,
  ): Promise<UserResponse> {
    return this.userService.changePassword(user.username, request);
  }
}
