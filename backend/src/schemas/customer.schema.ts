import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ collection: 'customers', timestamps: true })
export class Customer {
  @Prop({ type: Number, unique: true, required: true })
  id: number;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true, select: false }) // Don't include password in queries by default
  password: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  address?: string;

  @Prop()
  city?: string;

  @Prop()
  zipCode?: string;

  @Prop({ default: Date.now })
  lastLoginAt?: Date;

  // Virtual for full name
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Legacy support - keep original name field as virtual
  get name(): string {
    return this.fullName;
  }
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

// Add indexes for better performance
CustomerSchema.index({ id: 1 }, { unique: true });
CustomerSchema.index({ email: 1 }, { unique: true });
CustomerSchema.index({ phone: 1 });
CustomerSchema.index({ isActive: 1 });

// Add virtual for fullName
CustomerSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

CustomerSchema.virtual('name').get(function() {
  return `${this.firstName} ${this.lastName}`;
});