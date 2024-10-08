import { IsOptional, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @MinLength(1)
    userName: string;

    @IsString()
    @MinLength(6)
    password: string;
}