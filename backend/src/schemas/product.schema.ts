import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ collection: 'products', timestamps: true })
export class Product {
  @Prop({ type: Number, unique: true, required: true })
  id: number;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  brand: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ trim: true })
  category: string;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: 0, min: 0, max: 5 })
  rating: number;

  @Prop({ default: 0, min: 0 })
  reviewCount: number;

  @Prop({ type: String })
  createdBy?: string; // Admin who created this product

  @Prop({ type: String })
  lastModifiedBy?: string; // Admin who last modified this product

  @Prop({ type: Date })
  publishedAt?: Date; // When product was published

  @Prop({ default: 'draft', enum: ['draft', 'published', 'archived'] })
  status: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ id: 1 }, { unique: true });
ProductSchema.index({ brand: 1, isActive: 1 });
ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ name: 'text', description: 'text' });