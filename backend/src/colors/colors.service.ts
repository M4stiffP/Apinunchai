import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Color, ColorDocument } from '../schemas/color.schema';
import { CreateColorDto, UpdateColorDto } from '../dto/color-size.dto';

@Injectable()
export class ColorsService {
  constructor(
    @InjectModel(Color.name) private colorModel: Model<ColorDocument>,
  ) {}

  async findAll(): Promise<Color[]> {
    return this.colorModel.find({ isActive: true }).sort({ name: 1 }).exec();
  }

  async findById(id: number): Promise<Color> {
    const color = await this.colorModel.findOne({ id, isActive: true });
    if (!color) {
      throw new NotFoundException('Color not found');
    }
    return color;
  }

  async create(createColorDto: CreateColorDto): Promise<Color> {
    // Check if color name already exists
    const existingColor = await this.colorModel.findOne({ 
      name: createColorDto.name,
      isActive: true 
    });
    
    if (existingColor) {
      throw new ConflictException('Color name already exists');
    }

    // Get the next id
    const lastColor = await this.colorModel.findOne().sort({ id: -1 });
    const nextId = lastColor ? lastColor.id + 1 : 1;

    const color = new this.colorModel({
      id: nextId,
      ...createColorDto,
    });

    return color.save();
  }

  async update(id: number, updateColorDto: UpdateColorDto): Promise<Color> {
    const color = await this.colorModel.findOne({ id, isActive: true });
    if (!color) {
      throw new NotFoundException('Color not found');
    }

    // Check if new name conflicts with existing color
    if (updateColorDto.name && updateColorDto.name !== color.name) {
      const existingColor = await this.colorModel.findOne({ 
        name: updateColorDto.name,
        id: { $ne: id },
        isActive: true 
      });
      
      if (existingColor) {
        throw new ConflictException('Color name already exists');
      }
    }

    Object.assign(color, updateColorDto);
    return color.save();
  }

  async delete(id: number): Promise<void> {
    const color = await this.colorModel.findOne({ id, isActive: true });
    if (!color) {
      throw new NotFoundException('Color not found');
    }
    color.isActive = false;
    await color.save();
  }

  async addImage(id: number, imageUrl: string): Promise<Color> {
    const color = await this.colorModel.findOne({ id, isActive: true });
    if (!color) {
      throw new NotFoundException('Color not found');
    }
    
    if (!color.images.includes(imageUrl)) {
      color.images.push(imageUrl);
      if (!color.primaryImage) {
        color.primaryImage = imageUrl;
      }
      await color.save();
    }
    
    return color;
  }

  async removeImage(id: number, imageUrl: string): Promise<Color> {
    const color = await this.colorModel.findOne({ id, isActive: true });
    if (!color) {
      throw new NotFoundException('Color not found');
    }
    
    color.images = color.images.filter(img => img !== imageUrl);
    
    // If the removed image was the primary, set a new one
    if (color.primaryImage === imageUrl) {
      color.primaryImage = color.images.length > 0 ? color.images[0] : undefined;
    }
    
    await color.save();
    return color;
  }

  async setPrimaryImage(id: number, imageUrl: string): Promise<Color> {
    const color = await this.colorModel.findOne({ id, isActive: true });
    if (!color) {
      throw new NotFoundException('Color not found');
    }
    
    if (!color.images.includes(imageUrl)) {
      throw new NotFoundException('Image not found in color images');
    }
    
    color.primaryImage = imageUrl;
    await color.save();
    return color;
  }

  async addTag(id: number, tag: string): Promise<Color> {
    const color = await this.colorModel.findOne({ id, isActive: true });
    if (!color) {
      throw new NotFoundException('Color not found');
    }
    
    if (!color.tags.includes(tag)) {
      color.tags.push(tag);
      await color.save();
    }
    
    return color;
  }

  async removeTag(id: number, tag: string): Promise<Color> {
    const color = await this.colorModel.findOne({ id, isActive: true });
    if (!color) {
      throw new NotFoundException('Color not found');
    }
    color.tags = color.tags.filter(t => t !== tag);
    await color.save();
    return color;
  }

  async findByProductId(productId: number): Promise<Color[]> {
    return this.colorModel.find({ product_id: productId }).exec();
  }
}