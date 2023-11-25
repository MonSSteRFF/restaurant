import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from '../common/jwtGuard/accessToken.guard';
import { RefreshTokenGuard } from '../common/jwtGuard/refreshToken.guard';
import { LoginUserDto, RegisterUserDto, RegisterUserRoleDto } from './auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @Post('register/:role')
  register(@Body() dto: RegisterUserDto, @Param() params: RegisterUserRoleDto) {
    if (
      params.role === 'ADMIN' &&
      dto.additionalPassword !== process.env.CREATE_ADMIN_SECRET_KEY
    ) {
      throw new BadRequestException(
        'You cannot create admin user without additionalPassword',
      );
    }

    return this.authService.register(dto, params.role);
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
}
