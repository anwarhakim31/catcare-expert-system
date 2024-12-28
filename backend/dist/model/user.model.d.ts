export declare class ReqEditUser {
    username: string;
    fullname: string;
    photo?: string;
}
export declare class ReqEditPassword {
    password: string;
    newPassword: string;
}
export declare class ReqGetAllUser {
    page?: number;
    search?: string;
    limit?: number;
}
export declare class ReqPutPengguna {
    username: string;
    password: string;
    fullname: string;
    photo?: string;
}
export declare class ReqDeletePengguna {
    selected: string[];
}
export declare class UserResponse {
    fullname: string;
    username: string;
    photo?: string;
    isAdmin?: boolean;
}
