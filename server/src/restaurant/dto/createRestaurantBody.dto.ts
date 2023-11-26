import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Tags, TagsArray } from '../enums/tags.enum';

export class createRestaurantBodyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'name_of_your_restaurant' })
  name: string;
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ isArray: true, enum: TagsArray })
  tag: Tags[];
}
