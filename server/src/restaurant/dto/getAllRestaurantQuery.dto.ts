import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { SortType, SortTypeArray } from '../enums/sortType.enum';
import { SaleType, SaleTypeArray } from '../enums/saleType.enum';
import { TagsArray } from '../enums/tags.enum';

export class getAllRestaurantsQueryDto {
  @ApiProperty({ example: 5, required: false })
  limit?: number;
  @ApiProperty({ example: 0, required: false })
  skip?: number;
  @ApiProperty({ example: 'search by name of restaurant', required: false })
  search?: string;
  @ApiProperty({
    example: [...TagsArray].splice(0, 3).join(','),
    required: false,
  })
  tag?: string;
  @IsEnum(SortType)
  @IsOptional()
  @ApiProperty({
    enum: SortTypeArray.filter((item) => item !== SortType.default),
    required: false,
  })
  sort?: SortType;
  @IsEnum(SaleType)
  @IsOptional()
  @ApiProperty({
    enum: SaleTypeArray.filter((item) => item !== SaleType.default),
    required: false,
  })
  sale?: SaleType;
}
