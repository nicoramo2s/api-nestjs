import { IsOptional, IsString } from 'class-validator';

export class FilterPostsDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
