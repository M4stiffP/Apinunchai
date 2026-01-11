import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderItemDocument = OrderItem & Document;

@Schema({ collection: 'order_items', timestamps: true })
export class OrderItem {
  @Prop({ type: Number, unique: true, required: true })
  id: number;

  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  orderId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ProductVariant', required: true })
  productVariantId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  unitPrice: number;

  @Prop({ required: true, min: 0 })
  totalPrice: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
OrderItemSchema.index({ id: 1 }, { unique: true });
OrderItemSchema.index({ orderId: 1 });
OrderItemSchema.index({ productVariantId: 1 });