import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Role } from '../common/roleGuard/role.enum';
import { createUserData } from './dto/createUserData.dto';
import { User } from './entities/user.entity';
import { findUserByData } from './dto/findUserByData.dto';
import { updateUserData } from './dto/updateUserData.dto';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: createUserData, role: Role): Promise<User> {
    const user = await this.databaseService.user.create({
      data: {
        email: createUserDto.email,
        login: createUserDto.login,
        password: createUserDto.password,
        role: role,
      },
    });
    return user as User;
  }

  async remove(id: number) {
    const user = this.databaseService.user.delete({ where: { id } });
    if (user === null) {
      throw new ForbiddenException(`Cannot find user with id: ${id}`);
    }

    return `user by id ${id} successfully deleted`;
  }

  async findById(id: number): Promise<User> {
    const user = await this.databaseService.user.findFirst({ where: { id } });
    if (user === null) {
      throw new ForbiddenException(`Cannot find user with id: ${id}`);
    }

    return user as User;
  }

  async findByIdentifier(identifier: string): Promise<User> {
    const user = await this.databaseService.user.findFirst({
      where: { OR: [{ email: identifier }, { login: identifier }] },
    });
    if (user === null) {
      throw new ForbiddenException(`Identifier has incorrect: ${identifier}`);
    }
    return user as User;
  }

  async findBy(finder: findUserByData): Promise<User> {
    if (
      finder.id === undefined &&
      finder.login === undefined &&
      finder.email === undefined
    ) {
      throw new ForbiddenException('id, login, email has been undefined');
    }

    const user = await this.databaseService.user.findFirst({
      where: {
        OR: [
          { id: finder.id },
          { login: finder.login },
          { email: finder.email },
        ],
      },
    });

    return user as User;
  }

  async update(id: number, updateUserDto: updateUserData): Promise<User> {
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
    return updatedUser as User;
  }
}
