import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty({ example: 'title', description: 'title' })
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Nicolas', description: 'authors' })
  author?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'This a tech content', description: 'content' })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'tech, comedy', description: 'category' })
  category: string[];
}
