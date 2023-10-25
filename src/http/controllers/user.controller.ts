import { Controller, Get, Patch, Param, Delete } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract as c } from './contract';
import { UserService } from '../../ghost/user/user.service';
import { UserDto } from '../../ghost/user/dto/user.dto';
import { PaginatedDto } from './paginated.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @TsRestHandler(c)
  async handler() {
    return tsRestHandler(c, {
      createUser: async ({ body }) => {
        const userDto = await this.userService.create(body);

        return {
          status: 201,
          body: userDto,
        };
      },
      getUsers: async ({}) => {
        const users = await this.userService.findAll();
        const mappedUsers = users.map((user) => new UserDto(user));
        const paginated = new PaginatedDto<UserDto>();
        paginated.total = mappedUsers.length;
        paginated.results = mappedUsers;

        return {
          status: 200,
          body: {
            users: mappedUsers,
            meta: {
              total: paginated.total,
            },
          },
        };
      },
    });
  }

  @TsRestHandler(c.getUsers)
  async findAll(): Promise<PaginatedDto<UserDto>> {
    const users = await this.userService.findAll();
    const mappedUsers = users.map((user) => new UserDto(user));
    const paginated = new PaginatedDto<UserDto>();
    paginated.total = mappedUsers.length;
    paginated.results = mappedUsers;

    return paginated;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.userService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
