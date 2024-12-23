import { Body, Controller, HttpCode, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ReqEditPassword,
  ReqEditUser,
  UserResponse,
} from 'src/model/user.model';
import { AuthGuard } from 'src/guards/authGuard';
import { User } from 'src/decorators/user.decorator';
import { AuthResponse } from 'src/model/auth.model';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

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
