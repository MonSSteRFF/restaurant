import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Query,
  Req,
} from '@nestjs/common';
import {
  createRestaurantDto,
  getAllRestaurantsData,
  getAllRestaurantsQueryDto,
  removeRestaurantDto,
  SaleType,
  SortType,
  Tags,
} from './restaurant.dto';
import { RestaurantService } from './restaurant.service';
import { Request } from 'express';
import { Roles } from '../common/roleGuard/roles.decorator';
import { Role } from '../common/roleGuard/role.enum';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  removeRestaurantResponse,
  RestaurantResponse,
  RestaurantsResponse,
} from './entities/Restaurant.entity';

@ApiTags('restaurant api')
@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get('/')
  @ApiResponse({ status: 200, description: '', type: RestaurantsResponse })
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
  @ApiResponse({ status: 200, type: RestaurantResponse })
  create(@Req() req: Request, @Body() dto: createRestaurantDto) {
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
  remove(@Req() req: Request, @Body() dto: removeRestaurantDto) {
    return this.restaurantService.remove({
      userId: req.user['id'],
      removeId: dto.removeId,
    });
  }
}
