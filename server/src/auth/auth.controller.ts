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
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPair } from './entities/JwtPair.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 200, description: '', type: JwtPair })
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  @Post('register/:role')
  @ApiResponse({ status: 200, description: '', type: JwtPair })
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
  @ApiResponse({
    status: 200,
    description: 'successfully logout',
    type: 'logout',
  })
  @ApiHeader({ name: 'Authorization', description: 'Bearer your_access_token' })
  logout(@Req() req: Request) {
    return this.authService.logout(req.user['id']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @ApiResponse({ status: 200, description: '', type: JwtPair })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer your_old_access_token',
  })
  refreshTokens(@Req() req: Request) {
    const userId = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshToken(userId, refreshToken);
  }
}
