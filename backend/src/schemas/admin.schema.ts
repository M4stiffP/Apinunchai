import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema({ collection: 'admins', timestamps: true })
export class Admin {
  @Prop({ type: Number, unique: true, required: true })
  id: number;

  @Prop({ required: true, trim: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, trim: true })
  fullName: string;

  @Prop({ type: String, enum: ['super_admin', 'product_manager', 'content_manager'], default: 'product_manager' })
  role: string;

  @Prop({ type: [String], default: ['products.view', 'products.edit'] })
  permissions: string[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: Date })
  lastLoginAt: Date;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
AdminSchema.index({ id: 1 }, { unique: true });
AdminSchema.index({ email: 1 }, { unique: true });
AdminSchema.index({ username: 1 }, { unique: true });