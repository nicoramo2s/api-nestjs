import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CATEGORY } from 'src/common/enums/category.enum';
import { User } from 'src/users/schemas/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: String })
  content: string;

  @Prop({ enum: CATEGORY, required: true, default: CATEGORY.COMUN })
  category: CATEGORY;

  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  userId: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
