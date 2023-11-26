import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('main')
@Controller()
export class AppController {
  @Get('/ping')
  @ApiResponse({ status: 200, description: 'pong' })
  ping() {
    return 'pong';
  }
}
