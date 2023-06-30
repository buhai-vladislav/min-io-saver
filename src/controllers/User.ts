import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from '../services/User';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/self')
  public async getYourSelf(@Req() request: any) {
    const userId = request?.user?.userId;

    const userResponse = await this.userService.getOneByOptions({ id: userId });
    const { password, ...user } = userResponse;
    return user;
  }
}
