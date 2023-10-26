import { Controller, Get, Patch, Param, Delete } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract as c } from './user.contract';
import { UserService } from '../../ghost/user/user.service';
import { UserDto } from '../../ghost/user/dto/user.dto';
import { PaginatedDto } from './paginated.dto';
import { SuccessfulHttpStatusCode } from '@ts-rest/core/src/lib/status-codes';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
    this.createUser = this.createUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  async createUser({ body }): Promise<{
    status: SuccessfulHttpStatusCode;
    body: UserDto;
  }> {
    const userDto = await this.userService.create(body);

    return {
      status: 201,
      body: userDto,
    };
  }

  async getUsers(): Promise<{
    status: SuccessfulHttpStatusCode;
    body: { users: Array<any>; meta: any };
  }> {
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
  }

  @TsRestHandler(c)
  async handler() {
    return tsRestHandler(c, {
      createUser: this.createUser,
      getUsers: this.getUsers,
    });
  }

  @Get('/admin/users/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch('/admin/users/:id')
  update(@Param('id') id: string) {
    return this.userService.update(+id);
  }

  @Delete('/admin/users/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
