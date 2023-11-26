import { ApiProperty } from '@nestjs/swagger';

export class removeRestaurantResponse {
  @ApiProperty({ example: 1 })
  deleted: number;
}
