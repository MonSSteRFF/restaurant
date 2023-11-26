import { ApiProperty } from '@nestjs/swagger';
import { restaurant } from './restaurant.entity';

export class getAllRestaurantsResponse {
  @ApiProperty({ isArray: true, type: restaurant })
  data: restaurant[];
  @ApiProperty({ example: 12 })
  allLength: number;
  @ApiProperty({ example: 6 })
  filteredLength: number;
}
