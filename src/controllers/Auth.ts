import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO, LoginDTO } from '../dtos';
import { AuthService } from '../services/Auth';
import { PublicRoute } from '../guards/PublicRoute';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @Post('/signup')
  public async signup(@Body() createUserDto: CreateUserDTO) {
    return this.authService.signup(createUserDto);
  }

  @PublicRoute()
  @Post('/signin')
  public async signin(@Body() loginDto: LoginDTO) {
    return this.authService.signin(loginDto);
  }
}
