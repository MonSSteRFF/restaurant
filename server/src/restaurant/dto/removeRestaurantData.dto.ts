import { IsNotEmpty, IsNumber } from 'class-validator';

export class removeRestaurantData {
  @IsNumber()
  @IsNotEmpty()
  removeId: number;
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
