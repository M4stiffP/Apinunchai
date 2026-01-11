import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ColorDocument = Color & Document;

@Schema({ collection: 'colors', timestamps: true })
export class Color {
  @Prop({ type: Number, unique: true, required: true })
  id: number;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, match: /^#[0-9A-F]{6}$/i })
  hexCode: string;

  @Prop({ type: [String], default: [] })
  images: string[]; // Array of image URLs for this color

  @Prop({ type: String })
  primaryImage?: string; // Main image for this color

  @Prop({ type: [String], default: [] })
  tags: string[]; // Tags for this color (e.g., "dark", "light", "metallic")

  @Prop({ default: true })
  isActive: boolean;
}

export const ColorSchema = SchemaFactory.createForClass(Color);
ColorSchema.index({ id: 1 }, { unique: true });
ColorSchema.index({ name: 1 }, { unique: true });