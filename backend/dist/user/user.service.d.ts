import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { ReqDeletePengguna, ReqEditPassword, ReqEditUser, ReqGetAllUser, ReqPutPengguna, UserResponse } from 'src/model/user.model';
import { Paging } from 'src/model/web.model';
export declare class UserService {
    private validationService;
    private prismaService;
    constructor(validationService: ValidationService, prismaService: PrismaService);
    getAll(request: ReqGetAllUser): Promise<{
        data: UserResponse[];
        paging?: Paging;
    }>;
    delete(request: ReqDeletePengguna): Promise<import(".prisma/client").Prisma.BatchPayload>;
    put(request: ReqPutPengguna): Promise<{
        username: string;
        password: string;
        fullname: string;
        photo: string | null;
        createdAt: Date;
        updatedAt: Date;
        isAdmin: boolean;
    }>;
    editProfile(request: ReqEditUser): Promise<UserResponse>;
    changePassword(username: string, request: ReqEditPassword): Promise<UserResponse>;
}
