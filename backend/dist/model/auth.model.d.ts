export declare class RegisterRequest {
    username: string;
    password: string;
    fullname: string;
}
export declare class LoginRequest {
    username: string;
    password: string;
}
export declare class UpdateRequest {
    username: string;
    password: string;
    fullname: string;
}
export declare class AuthResponse {
    fullname: string;
    username: string;
    photo?: string;
    isAdmin?: boolean;
}
