import { ApiProperty } from '@nestjs/swagger';

export class RestaurantResponse {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'restaurant_name' })
  name: string;
  @ApiProperty({ example: 'sushi,burgers' })
  tag: string;
  @ApiProperty({ example: 'sales,free_delivery' })
  sale: string;
  @ApiProperty({ example: 4 })
  rank: number;
  @ApiProperty({ example: 14 })
  reviewCount: number;
  @ApiProperty({ example: 1800000 })
  time: number;
  @ApiProperty({ example: 400 })
  price: number;
  @ApiProperty({ example: 4 })
  userId: number;
}

export class RestaurantsResponse {
  @ApiProperty({ isArray: true, type: RestaurantResponse })
  data: RestaurantResponse[];
  @ApiProperty({ example: 12 })
  allLength: number;
  @ApiProperty({ example: 6 })
  filteredLength: number;
}

export class removeRestaurantResponse {
  @ApiProperty({ example: 1 })
  deleted: number;
}
