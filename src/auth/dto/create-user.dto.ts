import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { AuthBase } from "../interfaces/auth.interface";

export class CreateUserDto implements AuthBase{
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    @MinLength(3)
    lastName: string
}