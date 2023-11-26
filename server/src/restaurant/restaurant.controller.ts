import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Query,
  Req,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Request } from 'express';
import { Roles } from '../common/roleGuard/roles.decorator';
import { Role } from '../common/roleGuard/role.enum';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { restaurant } from './entities/restaurant.entity';
import { getAllRestaurantsResponse } from './entities/getAllRestaurantsResponse.entity';
import { removeRestaurantResponse } from './entities/removeRestaurantResponse.enity';
import { getAllRestaurantsQueryDto } from './dto/getAllRestaurantQuery.dto';
import { getAllRestaurantsData } from './dto/getAllRestaurantData.dto';
import { Tags } from './enums/tags.enum';
import { SortType } from './enums/sortType.enum';
import { SaleType } from './enums/saleType.enum';
import { createRestaurantBodyDto } from './dto/createRestaurantBody.dto';
import { removeRestaurantBodyDto } from './dto/removeRestaurantBody.dto';

@ApiTags('restaurant api')
@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    description: '',
    type: getAllRestaurantsResponse,
  })
  getAllRestaurants(@Query() queryDto: getAllRestaurantsQueryDto) {
    const dto: getAllRestaurantsData = {
      limit: queryDto.limit !== undefined ? Number(queryDto.limit) : 10,
      skip: queryDto.skip !== undefined ? Number(queryDto.skip) : 0,
      search: queryDto.search ?? '',
      tag:
        queryDto.tag !== undefined && queryDto.tag !== ''
          ? (queryDto.tag.toString().split(',') as Tags[])
          : [],
      sort: queryDto.sort ?? SortType.default,
      sale: queryDto.sale ?? SaleType.default,
    };

    if (isNaN(dto.limit) || isNaN(dto.skip)) {
      throw new BadRequestException('limit and skip must be a number');
    }

    return this.restaurantService.getAllRestaurants(dto);
  }

  @Roles([Role.ADMIN, Role.RES_ADMIN])
  @Get('create')
  @ApiHeader({
    name: 'Authorization',
    description:
      'Bearer your_access_token - only for users with role ADMIN or RES_ADMIN',
  })
  @ApiResponse({ status: 200, type: restaurant })
  create(@Req() req: Request, @Body() dto: createRestaurantBodyDto) {
    return this.restaurantService.create({
      name: dto.name,
      tag: dto.tag,
      ownerUserId: req.user['id'],
    });
  }

  @Roles([Role.ADMIN, Role.RES_ADMIN])
  @Get('remove')
  @ApiHeader({
    name: 'Authorization',
    description:
      'Bearer your_access_token - only for users with role ADMIN or RES_ADMIN',
  })
  @ApiResponse({ status: 200, type: removeRestaurantResponse })
  remove(@Req() req: Request, @Body() dto: removeRestaurantBodyDto) {
    return this.restaurantService.remove({
      userId: req.user['id'],
      removeId: dto.removeId,
    });
  }
}
