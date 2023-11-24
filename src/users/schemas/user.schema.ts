import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ROLES } from 'src/common/enums/role.enum';
import { Post } from 'src/posts/schema/post.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, enum: ROLES, required: true, default: ROLES.USER })
  role: ROLES;
}

export const UserSchema = SchemaFactory.createForClass(User);
