import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterPostsDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Nicolas', description: 'authors' })
  author?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'tech, comedy', description: 'category' })
  category?: string;
}
