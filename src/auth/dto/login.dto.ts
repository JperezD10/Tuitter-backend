import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthBase } from "../interfaces/auth.interface";

export class LoginDto implements AuthBase{
    @IsEmail()
    email: string;

    @IsString()
    password: string;

}