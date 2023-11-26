import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class removeRestaurantBodyDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  removeId: number;
}
