import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  //defaultStrategy: AuthGuard('jwt')
  @UseGuards(AuthGuard())
  @Get('profile')
  async getProfile(@Req() req: any) {
    return req.user;
  }
}
