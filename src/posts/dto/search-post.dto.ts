import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchPostsDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'title', description: 'title' })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '1', description: 'page' })
  page?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '10', description: 'limit element' })
  limit?: string;
}
