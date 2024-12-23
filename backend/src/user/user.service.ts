import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  ReqEditPassword,
  ReqEditUser,
  UserResponse,
} from 'src/model/user.model';
import { UserValidation } from './user.validation';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private validationService: ValidationService,

    private prismaService: PrismaService,
  ) {}

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
