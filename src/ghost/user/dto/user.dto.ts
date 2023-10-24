import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserDto {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.age = user.age;
    this.roles = user.roles;
  }

  @ApiProperty({ example: 1, description: 'User ID' })
  id: string;

  @ApiProperty({ example: 1, description: "User's email address" })
  email: string;
  name: string;
  age: number;

  roles: string[];
}
