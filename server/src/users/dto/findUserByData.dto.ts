import { IsNumber, IsString } from 'class-validator';

export class findUserByData {
  @IsNumber()
  id?: number;
  @IsString()
  login?: string;
  @IsString()
  email?: string;
}
