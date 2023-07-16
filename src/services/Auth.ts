import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateUserDTO } from '../dtos/CreateUser';
import { AuthUtils } from '../utils/AuthUtils';
import { User } from '../db/models/User';
import { LoginDTO } from '../dtos/Login';
import { IJwtPayload } from '../types/JwtPayload';
import { ISigininResponse } from '../types/SigninResponse';
import { throwError } from '../utils/Utils';
import { UserPassLess } from '../types/User';
import { UserService } from './User';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async signup(createUserDto: CreateUserDTO): Promise<UserPassLess> {
    const { password: pass, email } = createUserDto;
    let resultRes = null;

    try {
      const user = await User.findOne({ where: { email } });

      if (user) {
        throw new HttpException('User already exist.', HttpStatus.CONFLICT);
      }

      const passwordHash = await AuthUtils.generatePasswordHash(pass);

      resultRes = await this.userService.create({
        ...createUserDto,
        password: passwordHash,
      });
    } catch (error) {
      throwError(error, HttpStatus.BAD_REQUEST);
    }

    const { password, ...user } = resultRes;

    return user;
  }

  private async validateUser(
    loginDto: LoginDTO,
  ): Promise<Partial<User> | null> {
    const { email, password } = loginDto;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new HttpException(
        'Login or password is not correct.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await AuthUtils.checkPassword(
      password,
      user.password,
    );

    if (isPasswordValid) {
      const { password: _, ...validatedUser } = user; // Remove password property from result

      return validatedUser;
    }

    return null;
  }

  private signToken(payload: IJwtPayload): string {
    const token = this.jwtService.sign(payload);

    return token;
  }

  public async signin(loginDto: LoginDTO): Promise<ISigininResponse> {
    try {
      const validatedUser = await this.validateUser(loginDto);

      if (!validatedUser) {
        throw new HttpException(
          'Login or password is not correct.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const { id: userId, email } = validatedUser;
      const payload: IJwtPayload = { userId, email };

      const token = this.signToken(payload);
      const user: UserPassLess = validatedUser;

      return { user, token };
    } catch (error) {
      throwError(error, HttpStatus.BAD_REQUEST);
    }
  }
}
