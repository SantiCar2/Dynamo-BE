import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString,  } from "class-validator";


export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
    @IsString()
    name: string;

    @IsNumber()
    twoFA: number;

    @IsString()
    role: string;
    
}

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
}

export class VerifyDto {
    @IsString()
    @IsNotEmpty()
    token: string;
}