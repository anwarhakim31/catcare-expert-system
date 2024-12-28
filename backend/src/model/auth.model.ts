export class RegisterRequest {
  username: string;
  password: string;
  fullname: string;
}

export class LoginRequest {
  username: string;
  password: string;
}

export class UpdateRequest {
  username: string;
  password: string;
  fullname: string;
}

export class AuthResponse {
  fullname: string;
  username: string;
  photo?: string;
  isAdmin?: boolean;
  token?: string;
}
