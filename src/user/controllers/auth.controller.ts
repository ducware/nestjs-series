/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './../services/auth.service';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';

@Controller('auth')
export class AuhtController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() userDto: LoginUserDto) {
    return await this.authService.login(userDto);
  }
}
