import { ValidationService } from '../common/validation.service';
import { PrismaService } from '../common/prisma.service';
import { AuthResponse, LoginRequest, RegisterRequest, UpdateRequest } from '../model/auth.model';
export declare class AuthService {
    private validationService;
    private prismaService;
    constructor(validationService: ValidationService, prismaService: PrismaService);
    register(request: RegisterRequest): Promise<AuthResponse>;
    login(request: LoginRequest): Promise<AuthResponse>;
    update(request: UpdateRequest): Promise<AuthResponse>;
    get(user: AuthResponse): Promise<AuthResponse>;
}
