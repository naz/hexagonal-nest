import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Alex', description: "User's name" })
  name: string;

  @ApiProperty({
    example: 'alex@example.com',
    description: "User's email address",
  })
  email: string;

  @ApiProperty({
    example: 35,
    description: "User's age",
  })
  age: number;

  @ApiProperty({
    example: ['admin', 'user'],
    description: "User's roles",
  })
  roles: string[];
}
