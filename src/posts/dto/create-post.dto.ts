import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  author?: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  category: string[];
}
