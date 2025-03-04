import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Res,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UpdateRequest,
} from '../model/auth.model';

import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthGuard } from '../guards/authGuard';
import { JwtPayload } from '../model/payload.model';
import { WebResponse } from '../model/web.model';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private JwtService: JwtService,
  ) {}

  @Post('/register')
  async register(
    @Body() request: RegisterRequest,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.authService.register(request);

    const token = this.JwtService.sign(result as JwtPayload);

    response.json({
      success: true,
      message: 'Berhasil login',
      data: {
        ...result,
        token: token,
      },
    });
  }

  @Post('/login')
  async login(
    @Body() request: LoginRequest,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.authService.login(request);

    const token = this.JwtService.sign(result as JwtPayload);

    response.json({
      success: true,
      message: 'Berhasil login',
      data: {
        ...result,
        token: token,
      },
    });
  }

  @Patch('/forget-password')
  @HttpCode(200)
  async update(
    @Body() request: UpdateRequest,
  ): Promise<WebResponse<AuthResponse>> {
    await this.authService.update(request);

    return {
      success: true,
      message: 'Berhasil mengganti kata sandi',
    };
  }

  @Get('/current')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async get(@Req() req: Request, @Res() res: Response): Promise<void> {
    const user = req['user'];

    console.log(user);

    const result = await this.authService.get(user);

    res.json({
      success: true,
      message: 'Berhasil mengambil data ',
      data: result,
    });
  }

  // @Delete('/logout')
  // @HttpCode(200)
  // async delete(@Res() res: Response): Promise<void> {
  //   res.clearCookie('catcare');

  //   res.json({
  //     success: true,
  //     message: 'Berhasil logout',
  //   });
  // }
}
