export interface User {
  id?: number;
  username: string;
  fullname: string;
  photo?: string;
  password?: string;
  createdAt?: Date;
}

export interface Disease {
  id?: string;
  name: string;
  image: string;
  description: string;
  solution: string;
  createdAt?: Date;
}
