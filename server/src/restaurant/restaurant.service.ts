import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

import * as client from '@prisma/client';
import { UsersService } from '../users/users.service';
import { Role } from '../common/roleGuard/role.enum';
import { getAllRestaurantsResponse } from './entities/getAllRestaurantsResponse.entity';
import { restaurant } from './entities/restaurant.entity';
import { Tags, TagsArray } from './enums/tags.enum';
import { SaleType } from './enums/saleType.enum';
import { getAllRestaurantsData } from './dto/getAllRestaurantData.dto';
import { SortType } from './enums/sortType.enum';
import { createRestaurantData } from './dto/createRestaurantData.dto';
import { removeRestaurantData } from './dto/removeRestaurantData.dto';
import { removeRestaurantResponse } from './entities/removeRestaurantResponse.enity';

@Injectable()
export class RestaurantService {
  constructor(
    private databaseService: DatabaseService,
    private usersService: UsersService,
  ) {}

  async getAllRestaurants(
    data: getAllRestaurantsData,
  ): Promise<getAllRestaurantsResponse> {
    const { limit, skip, search, tag, sort, sale } = data;

    const orderSort = (): client.Prisma.RestaurantOrderByWithRelationInput => {
      switch (sort) {
        case SortType.default: {
          return {};
        }
        case SortType.byRanked: {
          return { rank: 'desc' };
        }
        case SortType.fastest: {
          return { time: 'desc' };
        }
        case SortType.high_price: {
          return { price: 'desc' };
        }
        case SortType.low_price: {
          return { price: 'asc' };
        }
      }
    };

    const restaurantsArray = await this.databaseService.restaurant.findMany({
      skip,
      take: limit,
      orderBy: [{ reviewCount: 'desc' }, { ...orderSort() }],
      where: { AND: [{ name: { contains: search } }] },
    });

    const filterBySearch = restaurantsArray
      .filter((item) => {
        const filterByTag =
          tag.length > 0
            ? tag.filter((tagItem) => item.tag.includes(tagItem)).length > 0
            : true;

        const filterBySale =
          sale === SaleType.default ? true : item.sale.includes(sale);

        return filterByTag && filterBySale;
      })

      .sort((a, b) => (a.reviewCount < b.reviewCount ? 1 : -1));

    return {
      data: filterBySearch.map((rest) => ({
        ...rest,
        tag: rest.tag.split(',') as Tags[],
        sale: rest.sale.split(',') as SaleType[],
      })),
      allLength: restaurantsArray.length,
      filteredLength: filterBySearch.length,
    };
  }

  async create(data: createRestaurantData): Promise<restaurant> {
    data.tag.forEach((tagItem) => {
      if (!TagsArray.includes(tagItem)) {
        throw new BadRequestException(`wrong tag - ${tagItem}`);
      }
    });

    const sameRestaurantName = await this.databaseService.restaurant.findFirst({
      where: { name: data.name },
    });
    if (sameRestaurantName !== null) {
      throw new BadRequestException(
        `restaurant with same name "${data.name}" already created`,
      );
    }

    const rest = await this.databaseService.restaurant.create({
      data: {
        name: data.name,
        tag: data.tag.join(','),
        ownerUserId: { connect: { id: data.ownerUserId } },
      },
    });

    return {
      ...rest,
      tag: rest.tag.split(',') as Tags[],
      sale: rest.sale.split(',') as SaleType[],
    };
  }

  async remove(data: removeRestaurantData): Promise<removeRestaurantResponse> {
    const user = await this.usersService.findById(data.userId);
    const restaurant = await this.databaseService.restaurant.findFirst({
      where: { id: data.removeId },
    });

    if (restaurant === null) {
      throw new BadRequestException(
        `Restaurant with id "${data.removeId}" has undefined`,
      );
    }

    if (user.role === Role.RES_ADMIN && restaurant.userId !== user.id) {
      throw new BadRequestException('You cannot delete not your restaurant');
    }

    await this.databaseService.restaurant.delete({
      where: { id: restaurant.id },
    });

    return { deleted: restaurant.id };
  }
}
