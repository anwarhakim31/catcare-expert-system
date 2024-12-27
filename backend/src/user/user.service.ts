import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from '../common/validation.service';
import {
  ReqDeletePengguna,
  ReqEditPassword,
  ReqEditUser,
  ReqGetAllUser,
  ReqPutPengguna,
  UserResponse,
} from 'src/model/user.model';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';
import { Paging } from 'src/model/web.model';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,

    private prismaService: PrismaService,
  ) {}

  async getAll(
    request: ReqGetAllUser,
  ): Promise<{ data: UserResponse[]; paging?: Paging }> {
    const getReq: ReqGetAllUser = this.validationService.validate(
      UserValidation.GETALL,
      request,
    );

    const filter = [];

    if (getReq.search) {
      filter.push({
        fullname: {
          contains: getReq.search,
        },
        username: {
          contains: getReq.search,
        },
      });
    }

    const user = await this.prismaService.user.findMany({
      where: {
        AND: filter,
        isAdmin: false,
      },
      skip: (getReq.page - 1) * getReq.limit,
      take: getReq.limit,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        username: true,
        fullname: true,
        createdAt: true,
        photo: true,
      },
    });

    const total = await this.prismaService.user.count({
      where: {
        AND: filter,
      },
    });

    return {
      data: user,
      paging: {
        limit: getReq.limit,
        totalPage: Math.ceil(total / getReq.limit),
        page: getReq.page,
        total: total,
      },
    };
  }
  async delete(request: ReqDeletePengguna) {
    const disease = await this.prismaService.user.deleteMany({
      where: {
        username: {
          in: request.selected,
        },
      },
    });

    if (disease.count == 0 || disease.count < request.selected.length) {
      throw new HttpException('pengguna tidak ditemukan', 404);
    }

    await this.prismaService.diagnosis.deleteMany({
      where: {
        username: {
          in: request.selected,
        },
      },
    });

    return disease;
  }

  async put(request: ReqPutPengguna) {
    const penggunaReq: ReqPutPengguna = this.validationService.validate(
      UserValidation.PUT,
      request,
    );

    const user = await this.prismaService.user.update({
      where: {
        username: penggunaReq.username,
      },
      data: {
        fullname: penggunaReq.fullname,
        photo: penggunaReq.photo,
      },
    });

    if (penggunaReq.password) {
      const salt = await bcrypt.genSalt();
      penggunaReq.password = await bcrypt.hash(penggunaReq.password, salt);

      await this.prismaService.user.update({
        where: {
          username: penggunaReq.username,
        },
        data: {
          password: penggunaReq.password,
        },
      });
    }

    return user;
  }

  async editProfile(request: ReqEditUser): Promise<UserResponse> {
    const RequestEdit: ReqEditUser = this.validationService.validate(
      UserValidation.EditProfie,
      request,
    );

    const user = await this.prismaService.user.update({
      where: {
        username: RequestEdit.username,
      },
      data: {
        fullname: RequestEdit.fullname,
        photo: RequestEdit.photo,
      },
    });

    return {
      username: user.username,
      fullname: user.fullname,
      photo: user.photo,
      isAdmin: user.isAdmin,
    };
  }

  async changePassword(
    username: string,
    request: ReqEditPassword,
  ): Promise<UserResponse> {
    const EditRequest: ReqEditPassword = this.validationService.validate(
      UserValidation.ChangePassword,
      request,
    );

    const user = await this.prismaService.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new HttpException('Akun tidak ditemukan', 404);
    }

    const isPasswordValid = await bcrypt.compare(
      EditRequest.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Password lama salah', 400);
    }

    const gensalt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(EditRequest.newPassword, gensalt);

    const updated = await this.prismaService.user.update({
      where: {
        username: username,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      username: updated.username,
      fullname: updated.fullname,
      photo: updated?.photo || null,
      isAdmin: updated.isAdmin,
    };
  }
}
