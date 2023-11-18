import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CATEGORY } from 'src/common/enums/category.enum';

export class CreatePostDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsEnum(CATEGORY)
  category: CATEGORY;
}
