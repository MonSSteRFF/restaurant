import { ApiProperty } from '@nestjs/swagger';

export class JwtPair {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  refresh_token: string;
}
