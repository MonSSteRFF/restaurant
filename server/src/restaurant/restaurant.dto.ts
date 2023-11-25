import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum Tags {
  burgers = 'burgers',
  sushi = 'sushi',
  pizza = 'pizza',
  wok = 'wok',
  paste = 'paste',
  soups = 'soups',
  breakfasts = 'breakfasts',
  dinner = 'dinner',
  gruzia = 'gruzia',
  italy = 'italy',
  russian = 'russian',
  uzbek = 'uzbek',
  asia = 'asia',
  japan = 'japan',
  china = 'china',
  coffee = 'coffee',
  dessert = 'dessert',
  bakery = 'bakery',
  shashlik = 'shashlik',
  shawurma = 'shawurma',
  steaks = 'steaks',
  sandwiches = 'sandwiches',
  seafood = 'seafood',
  healthy = 'healthy',
  europe = 'europe',
  fastfood = 'fastfood',
  east = 'east',
  cavcaz = 'cavcaz',
  childrens = 'childrens',
}
export const TagsArray = [
  Tags.burgers,
  Tags.sushi,
  Tags.pizza,
  Tags.wok,
  Tags.paste,
  Tags.soups,
  Tags.breakfasts,
  Tags.dinner,
  Tags.gruzia,
  Tags.italy,
  Tags.russian,
  Tags.uzbek,
  Tags.asia,
  Tags.japan,
  Tags.china,
  Tags.coffee,
  Tags.dessert,
  Tags.bakery,
  Tags.shashlik,
  Tags.shawurma,
  Tags.steaks,
  Tags.sandwiches,
  Tags.seafood,
  Tags.healthy,
  Tags.europe,
  Tags.fastfood,
  Tags.east,
  Tags.cavcaz,
  Tags.childrens,
];

export enum SaleType {
  default = 'default',
  sales = 'sales',
  free_delivery = 'free_delivery',
}

export enum SortType {
  default = 'default',
  byRanked = 'byRanked',
  fastest = 'fastest',
  low_price = 'low_price',
  high_price = 'high_price',
}

export interface Restaurant {
  id: number;
  name: string;
  tag: Tags[];
  sale: Omit<SaleType, 'default'>[];
  rank: number; // from 0 to 10
  reviewCount: number;
  time: number; // number in ms to delivery
  price: number; // allPositionPrice / allPositionLength
}

export class getAllRestaurantsQueryDto {
  @ApiProperty({ example: 5, required: false })
  limit?: number;
  @ApiProperty({ example: 0, required: false })
  skip?: number;
  @ApiProperty({ example: 'name of restaurant', required: false })
  search?: string;
  @ApiProperty({ example: 'sushi,burgers', required: false })
  tag?: string;
  @IsEnum(SortType)
  @IsOptional()
  @ApiProperty({
    enum: ['byRanked', 'fastest', 'low_price', 'high_price'],
    example: 'low_price',
    required: false,
  })
  sort?: SortType;
  @IsEnum(SaleType)
  @IsOptional()
  @ApiProperty({
    enum: ['sales', 'free_delivery'],
    example: 'free_delivery',
    required: false,
  })
  sale?: SaleType;
}

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

export class createRestaurantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'name_of_your_restaurant' })
  name: string;
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ isArray: true, enum: TagsArray })
  tag: Tags[];
}
export class createRestaurantData {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  tag: Tags[];

  @IsNumber()
  ownerUserId: number;
}

export class removeRestaurantDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  removeId: number;
}

export class removeRestaurantData {
  @IsNumber()
  @IsNotEmpty()
  removeId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
