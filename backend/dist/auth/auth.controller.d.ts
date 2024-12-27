import { AuthService } from './auth.service';
import { AuthResponse, LoginRequest, RegisterRequest, UpdateRequest } from '../model/auth.model';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { JwtPayload } from '../model/payload.model';
import { WebResponse } from '../model/web.model';
export declare class AuthController {
    private readonly authService;
    private JwtService;
    constructor(authService: AuthService, JwtService: JwtService);
    generateToken: (payload: JwtPayload) => string;
    register(request: RegisterRequest, response: Response): Promise<void>;
    login(request: LoginRequest, response: Response): Promise<void>;
    update(request: UpdateRequest): Promise<WebResponse<AuthResponse>>;
    get(req: Request, res: Response): Promise<void>;
    delete(res: Response): Promise<void>;
}
