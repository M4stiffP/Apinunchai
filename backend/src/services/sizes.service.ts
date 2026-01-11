import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Size, SizeDocument } from '../schemas/size.schema';
import { CreateSizeDto, UpdateSizeDto } from '../dto/color-size.dto';

@Injectable()
export class SizesService {
  constructor(
    @InjectModel(Size.name) private sizeModel: Model<SizeDocument>,
  ) {}

  async findAll(): Promise<Size[]> {
    return this.sizeModel
      .find({ isActive: true })
      .sort({ category: 1, sortOrder: 1, name: 1 })
      .exec();
  }

  async findByCategory(category: string): Promise<Size[]> {
    return this.sizeModel
      .find({ category, isActive: true })
      .sort({ sortOrder: 1, name: 1 })
      .exec();
  }

  async findById(id: number): Promise<Size> {
    const size = await this.sizeModel.findOne({ id, isActive: true });
    if (!size) {
      throw new NotFoundException('Size not found');
    }
    return size;
  }

  async create(createSizeDto: CreateSizeDto): Promise<Size> {
    // Check if size name already exists in the same category
    const existingSize = await this.sizeModel.findOne({ 
      name: createSizeDto.name,
      category: createSizeDto.category || 'general',
      isActive: true 
    });
    
    if (existingSize) {
      throw new ConflictException('Size name already exists in this category');
    }

    // Get the next id
    const lastSize = await this.sizeModel.findOne().sort({ id: -1 });
    const nextId = lastSize ? lastSize.id + 1 : 1;

    // Auto-assign sort order if not provided
    if (!createSizeDto.sortOrder) {
      const lastSizeInCategory = await this.sizeModel
        .findOne({ 
          category: createSizeDto.category || 'general',
          isActive: true 
        })
        .sort({ sortOrder: -1 });
      
      createSizeDto.sortOrder = lastSizeInCategory ? lastSizeInCategory.sortOrder + 1 : 1;
    }

    const size = new this.sizeModel({
      id: nextId,
      ...createSizeDto,
    });

    return size.save();
  }

  async update(id: number, updateSizeDto: UpdateSizeDto): Promise<Size> {
    const size = await this.sizeModel.findOne({ id, isActive: true });
    if (!size) {
      throw new NotFoundException('Size not found');
    }

    // Check if new name conflicts with existing size in the same category
    if (updateSizeDto.name && updateSizeDto.name !== size.name) {
      const category = updateSizeDto.category || size.category;
      const existingSize = await this.sizeModel.findOne({ 
        name: updateSizeDto.name,
        category,
        id: { $ne: id },
        isActive: true 
      });
      
      if (existingSize) {
        throw new ConflictException('Size name already exists in this category');
      }
    }

    Object.assign(size, updateSizeDto);
    return size.save();
  }

  async delete(id: number): Promise<void> {
    const size = await this.sizeModel.findOne({ id, isActive: true });
    if (!size) {
      throw new NotFoundException('Size not found');
    }
    size.isActive = false;
    await size.save();
  }

  async reorderSizes(category: string, sizeOrders: { id: number; sortOrder: number }[]): Promise<void> {
    const promises = sizeOrders.map(async ({ id, sortOrder }) => {
      const size = await this.sizeModel.findOne({ id, isActive: true });
      if (size && size.category === category) {
        size.sortOrder = sortOrder;
        return size.save();
      }
    });

    await Promise.all(promises);
  }
}