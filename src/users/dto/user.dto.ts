import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({ example: 'nicolas', description: 'username' })
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'nicolas@nicolas.com', description: 'email' })
  readonly email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ example: 'password', description: 'password' })
  readonly password: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
