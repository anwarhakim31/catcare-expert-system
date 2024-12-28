import { UserService } from './user.service';
import { ReqDeletePengguna, ReqEditPassword, ReqEditUser, ReqPutPengguna, UserResponse } from 'src/model/user.model';
import { AuthResponse } from 'src/model/auth.model';
import { WebResponse } from 'src/model/web.model';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll(search?: string, page?: number, limit?: number): Promise<WebResponse<UserResponse[]>>;
    Delete(request: ReqDeletePengguna): Promise<WebResponse<{
        name: string;
    }>>;
    Put(request: ReqPutPengguna): Promise<WebResponse<{
        name: string;
    }>>;
    editProfile(request: ReqEditUser): Promise<UserResponse>;
    changePassword(request: ReqEditPassword, user: AuthResponse): Promise<UserResponse>;
}
