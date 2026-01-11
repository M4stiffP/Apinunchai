import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { OrderItem, OrderItemDocument } from '../schemas/order-item.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(OrderItem.name) private orderItemModel: Model<OrderItemDocument>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('customerId').exec();
  }

  async findById(id: number): Promise<Order> {
    return this.orderModel.findOne({ id }).populate('customerId').exec();
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    return this.orderModel.find({ customerId }).populate('customerId').exec();
  }
}