import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ROLES } from 'src/common/enums/role.enum';

export class Login {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@test.com', description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Example1234.', description: 'password' })
  password: string;
}

export class Register extends Login {
  @IsNotEmpty()
  @ApiProperty({ example: 'Nicolas', description: 'username' })
  username?: string;

  @IsEmail()
  @ApiProperty({ example: 'nico@nico.com', description: 'email' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Example1234.', description: 'password' })
  password: string;
}
