import { User } from "../entities/user.entity";

export interface AuthResponse extends User{
    token: string;
}