export class ReqEditUser {
  username: string;
  fullname: string;
  photo?: string;
}

export class ReqEditPassword {
  password: string;
  newPassword: string;
}

export class ReqGetAllUser {
  page?: number;
  search?: string;
  limit?: number;
}

export class UserResponse {
  fullname: string;
  username: string;
  photo?: string;
  isAdmin?: boolean;
}
