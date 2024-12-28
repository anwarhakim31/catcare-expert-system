import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../model/payload.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.catcare;

    if (!token) {
      throw new HttpException(
        'Unauthorized, Waktu sesi telah habis, silahkan login kembali',
        401,
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      request['user'] = payload as JwtPayload;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
