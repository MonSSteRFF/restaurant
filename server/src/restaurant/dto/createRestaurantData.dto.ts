import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Tags, TagsArray } from '../enums/tags.enum';

export class createRestaurantData {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsArray()
  tag: Tags[];
  @IsNumber()
  ownerUserId: number;
}
