import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
