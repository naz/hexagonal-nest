import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { IUserRepository } from './user.repository';
import ObjectID from 'bson-objectid';
import { User } from './entities/user.entity';
import { Inject } from 'src/common/inject';

export class UserService {
  constructor(
    @Inject('UserRepository') private readonly repository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const id = new ObjectID();
    const user = new User(
      id.toHexString(),
      createUserDto.email,
      createUserDto.name,
      createUserDto.age,
    );
    await this.repository.save(user);

    const userDto = new UserDto(user);
    return userDto;
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
