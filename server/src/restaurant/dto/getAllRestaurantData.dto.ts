import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { Tags } from '../enums/tags.enum';
import { SortType } from '../enums/sortType.enum';
import { SaleType } from '../enums/saleType.enum';

export class getAllRestaurantsData {
  limit: number;
  skip: number;
  search: string;
  @IsArray()
  @IsOptional()
  tag: Tags[];
  @IsEnum(SortType)
  @IsOptional()
  sort: string;
  @IsEnum(SaleType)
  @IsOptional()
  sale: SaleType;
}
