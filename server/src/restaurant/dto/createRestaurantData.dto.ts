import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Tags } from '../enums/tags.enum';

export class createRestaurantData {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsArray()
  tag: Tags[];
  @IsNumber()
  ownerUserId: number;
}
