import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { LoginUserDto, RegisterUserDto } from './auth.dto';
import * as process from 'process';
import { Role } from '../common/roleGuard/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: RegisterUserDto, role: Role) {
    const user = await this.usersService.create(
      {
        ...createUserDto,
        password: this.encryptString(createUserDto.password),
      },
      role,
    );
    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByIdentifier(
      loginUserDto.identifier,
    );
    if (!this.compareStrings(loginUserDto.password, user.password)) {
      throw new BadRequestException('Password has incorrect');
    }
    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(id: number) {
    await this.usersService.update(id, { refreshToken: '' });
    return 'successfully logout';
  }

  async refreshToken(id: number, refreshToken: string) {
    const user = await this.usersService.findById(id);
    if (user.refreshToken === '') {
      throw new ForbiddenException('Access Denied');
    }
    if (!this.compareStrings(user.refreshToken, refreshToken)) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(id, user.login);
    await this.updateRefreshToken(id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefresh = this.encryptString(refreshToken);
    await this.usersService.update(id, { refreshToken: hashedRefresh });
  }

  private async getTokens(id: number, login: string) {
    const subject = { id, login };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(subject, {
        secret: process.env.JWT_SECRET_ACCESS_CODE,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(subject, {
        secret: process.env.JWT_SECRET_REFRESH_CODE,
        expiresIn: '7d',
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private encryptString(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    return `${salt}:${hash}`;
  }

  private compareStrings(
    enteredPassword: string,
    storedPassword: string,
  ): boolean {
    const [salt, storedHash] = storedPassword.split(':');
    const hash = crypto
      .pbkdf2Sync(enteredPassword, salt, 1000, 64, 'sha512')
      .toString('hex');
    return hash === storedHash;
  }
}
