import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CATEGORY } from 'src/common/enums/category.enum';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: String })
  content: string;

  @Prop({ enum: CATEGORY, required: true })
  category: CATEGORY;
}

export const PostSchema = SchemaFactory.createForClass(Post);
