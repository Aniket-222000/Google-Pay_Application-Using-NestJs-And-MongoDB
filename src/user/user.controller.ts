import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() req) {
    const userId = req.user.userId;
    return this.userService.findById(userId);
  }

  @Put('profile')
  async updateProfile(@Req() req, @Body() updateData: any) {
    const userId = req.user.userId;
    return this.userService.update(userId, updateData);
  }
}
