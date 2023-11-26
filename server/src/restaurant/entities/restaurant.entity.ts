import { ApiProperty } from '@nestjs/swagger';
import { Tags, TagsArray } from '../enums/tags.enum';
import { SaleType, SaleTypeArray } from '../enums/saleType.enum';

export class restaurant {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'restaurant_name' })
  name: string;
  @ApiProperty({
    example: [...TagsArray].splice(0, 5),
    type: TagsArray,
    isArray: true,
  })
  tag: Tags[];
  @ApiProperty({
    type: SaleTypeArray,
    example: [...SaleTypeArray].splice(0, 5),
    isArray: true,
  })
  sale: SaleType[];
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
