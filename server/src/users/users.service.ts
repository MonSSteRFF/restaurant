import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto, FindUserByDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    return this.databaseService.user.create({
      data: {
        email: createUserDto.email,
        login: createUserDto.login,
        password: createUserDto.password,
      },
    });
  }

  async remove(id: number) {
    const user = this.databaseService.user.delete({ where: { id } });
    if (user === null) {
      throw new ForbiddenException(`Cannot find user with id: ${id}`);
    }
  }

  async findById(id: number) {
    const user = await this.databaseService.user.findFirst({ where: { id } });
    if (user === null) {
      throw new ForbiddenException(`Cannot find user with id: ${id}`);
    }
    return user;
  }

  async findByIdentifier(identifier: string) {
    const user = await this.databaseService.user.findFirst({
      where: { OR: [{ email: identifier }, { login: identifier }] },
    });
    if (user === null) {
      throw new ForbiddenException(`Identifier has incorrect: ${identifier}`);
    }
    return user;
  }

  async findBy(finder: FindUserByDto) {
    if (
      finder.id === undefined &&
      finder.login === undefined &&
      finder.email === undefined
    ) {
      throw new ForbiddenException('id, login, email has been undefined');
    }

    return this.databaseService.user.findFirst({
      where: {
        OR: [
          { id: finder.id },
          { login: finder.login },
          { email: finder.email },
        ],
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);

    const updatedUser = await this.databaseService.user.update({
      where: { id },
      data: {
        email: updateUserDto?.email ?? user.email,
        login: updateUserDto?.login ?? user.login,
        password: updateUserDto?.password ?? user.password,
        role: updateUserDto?.role ?? user.role,
        refreshToken: updateUserDto?.refreshToken ?? user.refreshToken,
      },
    });

    if (updatedUser === null) {
      throw new ForbiddenException('Cannot find user by id for update');
    }
    return updatedUser;
  }
}
