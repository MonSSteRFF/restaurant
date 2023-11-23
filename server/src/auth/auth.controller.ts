import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from '../common/jwtGuard/accessToken.guard';
import { RefreshTokenGuard } from '../common/jwtGuard/refreshToken.guard';
import { LoginUserDto, RegisterUserDto } from './auth.dto';
import { Request } from 'express';
import { Role } from '../common/roleGuard/role.enum';
import { Roles } from '../common/roleGuard/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req.user['id']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshToken(userId, refreshToken);
  }

  @Roles([Role.USER])
  @Get('guarded')
  guarded() {
    return 'guarded heh !';
  }
}
