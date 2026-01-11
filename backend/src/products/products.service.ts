import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { ProductVariant, ProductVariantDocument } from '../schemas/product-variant.schema';
import { CreateProductDto, UpdateProductDto } from '../dto/product-admin.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(ProductVariant.name) private variantModel: Model<ProductVariantDocument>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find({ isActive: true, status: 'published' }).exec();
  }

  async findAllForAdmin(): Promise<Product[]> {
    return this.productModel.find().sort({ createdAt: -1 }).exec();
  }

  async findById(id: number): Promise<Product> {
    const product = await this.productModel.findOne({ id, isActive: true }).exec();
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async findByIdForAdmin(id: number): Promise<Product> {
    const product = await this.productModel.findOne({ id }).exec();
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Check if product name already exists
    const existingProduct = await this.productModel.findOne({ 
      name: createProductDto.name,
      brand: createProductDto.brand,
      isActive: true 
    });
    
    if (existingProduct) {
      throw new ConflictException('Product with this name and brand already exists');
    }

    // Get the next id
    const lastProduct = await this.productModel.findOne().sort({ id: -1 });
    const nextId = lastProduct ? lastProduct.id + 1 : 1;

    const product = new this.productModel({
      id: nextId,
      ...createProductDto,
      status: createProductDto.status || 'draft',
    });

    if (createProductDto.status === 'published') {
      product.publishedAt = new Date();
    }

    return product.save();
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productModel.findOne({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    // Check if new name conflicts with existing product
    if (updateProductDto.name && (updateProductDto.name !== product.name || updateProductDto.brand !== product.brand)) {
      const existingProduct = await this.productModel.findOne({ 
        name: updateProductDto.name,
        brand: updateProductDto.brand || product.brand,
        id: { $ne: id },
        isActive: true 
      });
      
      if (existingProduct) {
        throw new ConflictException('Product with this name and brand already exists');
      }
    }

    // Update publishedAt if status changes to published
    if (updateProductDto.status === 'published' && product.status !== 'published') {
      updateProductDto.publishedAt = new Date();
    }

    Object.assign(product, updateProductDto);
    return product.save();
  }

  async delete(id: number): Promise<void> {
    const product = await this.productModel.findOne({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    product.isActive = false;
    product.status = 'archived';
    await product.save();

    // Also deactivate all variants
    await this.variantModel.updateMany(
      { productId: (product as any)._id },
      { isActive: false }
    );
  }

  async publish(id: number): Promise<Product> {
    const product = await this.productModel.findOne({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    product.status = 'published';
    product.publishedAt = new Date();
    return product.save();
  }

  async unpublish(id: number): Promise<Product> {
    const product = await this.productModel.findOne({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    product.status = 'draft';
    return product.save();
  }

  async findByBrand(brand: string): Promise<Product[]> {
    return this.productModel.find({ brand, isActive: true, status: 'published' }).exec();
  }

  async searchProducts(query: string): Promise<Product[]> {
    return this.productModel.find({
      $and: [
        { isActive: true, status: 'published' },
        {
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { brand: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    }).exec();
  }

  async getProductVariants(productId: number): Promise<ProductVariant[]> {
    const product = await this.findById(productId);
    return this.variantModel
      .find({ productId: (product as any)._id, isActive: true })
      .populate('colorId')
      .populate('sizeId')
      .exec();
  }

  async getAllBrands(): Promise<string[]> {
    const brands = await this.productModel.distinct('brand', { isActive: true, status: 'published' });
    return brands.sort();
  }

  async getAllCategories(): Promise<string[]> {
    const categories = await this.productModel.distinct('category', { isActive: true, status: 'published' });
    return categories.sort();
  }
}