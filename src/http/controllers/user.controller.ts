import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiBearerAuth,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserService } from '../../ghost/user/user.service';
import { CreateUserDto } from '../../ghost/user/dto/create-user.dto';
import { UpdateUserDto } from '../../ghost/user/dto/update-user.dto';
import { UserDto } from '../../ghost/user/dto/user.dto';
import { PaginatedDto } from './paginated.dto';

@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
    console.log('UserController constructor');
    console.log(this.userService);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiForbiddenResponse({ description: 'Access Forbidden.' })
  @ApiResponse({
    status: 201,
    description: 'User Created',
  })
  @ApiHeader({
    name: 'X-MyHeader',
    description: 'Custom header',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiForbiddenResponse({ description: 'Access Forbidden.' })
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedDto<UserDto>) },
        {
          properties: {
            results: {
              type: 'array',
              items: { $ref: getSchemaPath(UserDto) },
            },
          },
        },
      ],
    },
  })
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
