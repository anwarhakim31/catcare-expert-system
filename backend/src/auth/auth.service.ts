import { HttpException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { ValidationService } from '../common/validation.service';
import { PrismaService } from '../common/prisma.service';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UpdateRequest,
} from '../model/auth.model';
import { AuthValidation } from './auth.validation';

@Injectable()
export class AuthService {
  constructor(
    private validationService: ValidationService,

    private prismaService: PrismaService,
  ) {}

  async register(request: RegisterRequest): Promise<AuthResponse> {
    try {
      const registerRequest: RegisterRequest = this.validationService.validate(
        AuthValidation.REGISTER,
        request,
      );

      const totalUserWithSameUsername = await this.prismaService.user.count({
        where: {
          username: registerRequest.username,
        },
      });

      if (totalUserWithSameUsername != 0) {
        throw new HttpException('Nama pengguna sudah digunakan', 400);
      }

      registerRequest.password = await bcrypt.hash(
        registerRequest.password,
        10,
      );

      const user = await this.prismaService.user.create({
        data: registerRequest,
      });

      return {
        username: user.username,
        fullname: user.fullname,
        photo: user.photo,
        isAdmin: user.isAdmin,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    const LoginRequest: LoginRequest = this.validationService.validate(
      AuthValidation.LOGIN,
      request,
    );

    const user = await this.prismaService.user.findUnique({
      where: {
        username: LoginRequest.username,
      },
    });

    if (!user) {
      throw new HttpException('Nama pengguna atau kata sandi salah', 401);
    }

    const isPasswordValid = await bcrypt.compare(
      LoginRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Nama pengguna atau kata sandi salah', 401);
    }

    return {
      username: user.username,
      fullname: user.fullname,
      photo: user?.photo || null,
      isAdmin: user.isAdmin,
    };
  }

  async update(request: UpdateRequest): Promise<AuthResponse> {
    const UpdateRequest: UpdateRequest = this.validationService.validate(
      AuthValidation.UPDATE,
      request,
    );

    console.log(UpdateRequest);
    const isMatch = await this.prismaService.user.findFirst({
      where: {
        username: UpdateRequest.username,
        fullname: UpdateRequest.fullname,
      },
    });

    if (!isMatch) {
      throw new HttpException('Akun tidak ditemukan', 404);
    }

    const gentSalt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(UpdateRequest.password, gentSalt);

    const user = await this.prismaService.user.update({
      where: {
        username: UpdateRequest.username,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      username: user.username,
      fullname: user.fullname,
    };
  }

  async get(user: AuthResponse): Promise<AuthResponse> {
    const userData = this.prismaService.user.findUnique({
      where: {
        username: user.username,
      },
    });

    return userData;
  }
}
