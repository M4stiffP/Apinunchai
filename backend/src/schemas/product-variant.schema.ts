import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductVariantDocument = ProductVariant & Document;

@Schema({ collection: 'product_variants', timestamps: true })
export class ProductVariant {
  @Prop({ type: Number, unique: true, required: true })
  id: number;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Color', required: true })
  colorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Size', required: true })
  sizeId: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  stock: number;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductVariantSchema = SchemaFactory.createForClass(ProductVariant);
ProductVariantSchema.index({ id: 1 }, { unique: true });
ProductVariantSchema.index({ productId: 1, colorId: 1, sizeId: 1 }, { unique: true });
ProductVariantSchema.index({ productId: 1, isActive: 1 });
ProductVariantSchema.index({ stock: 1, isActive: 1 });