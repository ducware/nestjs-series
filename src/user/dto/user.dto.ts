/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  name: string;
  @MinLength(6)
  password: string;
}

export class LoginUserDto {
  @IsEmail()
  email: string;
  @MinLength(6)
  password: string;
}
