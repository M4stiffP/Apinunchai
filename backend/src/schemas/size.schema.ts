import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SizeDocument = Size & Document;

@Schema({ collection: 'sizes', timestamps: true })
export class Size {
  @Prop({ type: Number, unique: true, required: true })
  id: number;

  @Prop({ required: true, trim: true })
  name: string; // e.g., "39", "40", "41", "XS", "S", "M", "L", "XL"

  @Prop({ trim: true })
  description: string;

  @Prop({ type: String, enum: ['shoe', 'clothing', 'general'], default: 'general' })
  category: string; // Category of size (for better organization)

  @Prop({ type: Number })
  sortOrder: number; // For custom sorting (e.g., shoe sizes 38, 39, 40...)

  @Prop({ default: true })
  isActive: boolean;
}

export const SizeSchema = SchemaFactory.createForClass(Size);
SizeSchema.index({ id: 1 }, { unique: true });
SizeSchema.index({ name: 1 }, { unique: true });