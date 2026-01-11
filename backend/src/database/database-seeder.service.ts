import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { Color, ColorDocument } from '../schemas/color.schema';
import { Size, SizeDocument } from '../schemas/size.schema';
import { Customer, CustomerDocument } from '../schemas/customer.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class DatabaseSeeder {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
    @InjectModel('Color') private colorModel: Model<ColorDocument>,
    @InjectModel('Size') private sizeModel: Model<SizeDocument>,
    @InjectModel('Customer') private customerModel: Model<CustomerDocument>,
  ) {}

  async clearDatabase() {
    console.log('🗑️ Clearing existing data...');
    await Promise.all([
      this.sizeModel.deleteMany({}),
      this.colorModel.deleteMany({}),
      this.productModel.deleteMany({}),
      this.customerModel.deleteMany({}),
    ]);
    console.log('✅ Database cleared');
  }

  async seedProducts() {
    console.log('👟 Seeding products...');
    
    const products = [
      {
        product_id: 1,
        brand: 'HOKA',
        model: 'Bondi 8',
        description: 'Experience the ultimate in plush comfort with the HOKA Bondi 8, the pinnacle of Maximum Cushion footwear.',
        price: 6490,
        isActive: true,
        stockQuantity: 50,
        imageUrl: '/images/products/hoka-bondi-8.jpg',
        tags: ['running', 'comfort', 'cushion']
      },
      {
        product_id: 2,
        brand: 'HOKA',
        model: 'Bondi 9 Wide',
        description: 'The next evolution of our best-selling Bondi series with enhanced comfort for wide feet.',
        price: 6990,
        isActive: true,
        stockQuantity: 30,
        imageUrl: '/images/products/hoka-bondi-9-wide.jpg',
        tags: ['running', 'wide-fit', 'cushion']
      },
      {
        product_id: 3,
        brand: 'NIKE',
        model: 'Alphafly 3',
        description: 'Revolutionary carbon fiber plate technology for elite performance running.',
        price: 9400,
        isActive: true,
        stockQuantity: 15,
        imageUrl: '/images/products/nike-alphafly-3.jpg',
        tags: ['racing', 'elite', 'carbon-plate']
      },
      {
        product_id: 4,
        brand: 'NEW BALANCE',
        model: '327',
        description: 'Retro-inspired lifestyle sneaker with modern comfort technology.',
        price: 3600,
        isActive: true,
        stockQuantity: 40,
        imageUrl: '/images/products/nb-327.jpg',
        tags: ['lifestyle', 'retro', 'casual']
      },
      {
        product_id: 5,
        brand: 'NEW BALANCE',
        model: '530',
        description: 'Classic chunky sneaker design with premium materials and comfort.',
        price: 3900,
        isActive: true,
        stockQuantity: 35,
        imageUrl: '/images/products/nb-530.jpg',
        tags: ['lifestyle', 'chunky', 'street']
      },
      {
        product_id: 6,
        brand: 'HOKA',
        model: 'Kawana 2',
        description: 'Versatile daily trainer with balanced cushioning for all-day comfort.',
        price: 5490,
        isActive: true,
        stockQuantity: 25,
        imageUrl: '/images/products/hoka-kawana-2.jpg',
        tags: ['training', 'daily', 'versatile']
      }
    ];

    const createdProducts = await this.productModel.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);
    return createdProducts;
  }

  async seedColors(products: any[]) {
    console.log('🎨 Seeding colors...');
    
    const colorsData = [
      // HOKA Bondi 8 colors
      { product_id: 1, color_name: 'Black', imageUrl: '/images/products/bondi-8-black.jpg', colortag: '#000000' },
      { product_id: 1, color_name: 'White', imageUrl: '/images/products/bondi-8-white.jpg', colortag: '#FFFFFF' },
      { product_id: 1, color_name: 'Blue Stone', imageUrl: '/images/products/bondi-8-blue.jpg', colortag: '#4682B4' },
      
      // HOKA Bondi 9 Wide colors
      { product_id: 2, color_name: 'Black', imageUrl: '/images/products/bondi-9-black.jpg', colortag: '#000000' },
      { product_id: 2, color_name: 'Blue', imageUrl: '/images/products/bondi-9-blue.jpg', colortag: '#1e90ff' },
      { product_id: 2, color_name: 'Cyan', imageUrl: '/images/products/bondi-9-cyan.jpg', colortag: '#00ffff' },
      { product_id: 2, color_name: 'Gold', imageUrl: '/images/products/bondi-9-gold.jpg', colortag: '#ffd700' },
      
      // NIKE Alphafly 3 colors
      { product_id: 3, color_name: 'Blue', imageUrl: '/images/products/alphafly-3-blue.jpg', colortag: '#1e90ff' },
      { product_id: 3, color_name: 'Black', imageUrl: '/images/products/alphafly-3-black.jpg', colortag: '#000000' },
      { product_id: 3, color_name: 'Cyan', imageUrl: '/images/products/alphafly-3-cyan.jpg', colortag: '#00ffff' },
      { product_id: 3, color_name: 'White', imageUrl: '/images/products/alphafly-3-white.jpg', colortag: '#ffffff' },
      
      // NEW BALANCE 327 colors
      { product_id: 4, color_name: 'Black', imageUrl: '/images/products/nb327-black.jpg', colortag: '#000000' },
      { product_id: 4, color_name: 'Blue', imageUrl: '/images/products/nb327-blue.jpg', colortag: '#1e90ff' },
      { product_id: 4, color_name: 'Cream', imageUrl: '/images/products/nb327-cream.jpg', colortag: '#f5f5dc' },
      { product_id: 4, color_name: 'White', imageUrl: '/images/products/nb327-white.jpg', colortag: '#ffffff' },
      
      // NEW BALANCE 530 colors
      { product_id: 5, color_name: 'Black', imageUrl: '/images/products/nb530-black.jpg', colortag: '#000000' },
      { product_id: 5, color_name: 'Gray', imageUrl: '/images/products/nb530-gray.jpg', colortag: '#808080' },
      { product_id: 5, color_name: 'Pink', imageUrl: '/images/products/nb530-pink.jpg', colortag: '#ffc0cb' },
      { product_id: 5, color_name: 'Silver', imageUrl: '/images/products/nb530-silver.jpg', colortag: '#c0c0c0' },
      
      // HOKA Kawana 2 colors
      { product_id: 6, color_name: 'Black', imageUrl: '/images/products/kawana-2-black.jpg', colortag: '#000000' },
      { product_id: 6, color_name: 'Blue', imageUrl: '/images/products/kawana-2-blue.jpg', colortag: '#1e90ff' },
      { product_id: 6, color_name: 'Gray', imageUrl: '/images/products/kawana-2-gray.jpg', colortag: '#808080' },
      { product_id: 6, color_name: 'White', imageUrl: '/images/products/kawana-2-white.jpg', colortag: '#ffffff' },
    ];

    const colors: any[] = [];
    let colorId = 1;

    for (const colorData of colorsData) {
      const product = products.find(p => p.product_id === colorData.product_id);
      if (product) {
        const color = new this.colorModel({
          color_id: colorId++,
          color_name: colorData.color_name,
          imageUrl: colorData.imageUrl,
          colortag: colorData.colortag,
          product: product._id,
          product_id: colorData.product_id,
          isActive: true
        });
        colors.push(color);
      }
    }

    const createdColors = await this.colorModel.insertMany(colors);
    console.log(`✅ Created ${createdColors.length} colors`);
    return createdColors;
  }

  async seedSizes(products: any[], colors: any[]) {
    console.log('📏 Seeding sizes...');
    
    const sizes: any[] = [];
    const sizeValues = ['39', '40', '41', '42', '43', '44'];
    let sizeId = 1;

    for (const product of products) {
      const productColors = colors.filter(c => c.product_id === product.product_id);
      
      for (const color of productColors) {
        for (const sizeValue of sizeValues) {
          const size = new this.sizeModel({
            size_id: sizeId++,
            size_value: sizeValue,
            product: product._id,
            color: color._id,
            product_id: product.product_id,
            color_id: color.color_id,
            stock_quantity: Math.floor(Math.random() * 10) + 5, // Random stock 5-14
            isActive: true
          });
          sizes.push(size);
        }
      }
    }

    const createdSizes = await this.sizeModel.insertMany(sizes);
    console.log(`✅ Created ${createdSizes.length} sizes`);
    
    // Update product colors and sizes references
    for (const product of products) {
      const productColors = colors.filter(c => c.product_id === product.product_id);
      const productSizes = createdSizes.filter(s => s.product_id === product.product_id);
      
      await this.productModel.findByIdAndUpdate(product._id, {
        colors: productColors.map(c => c._id),
        sizes: productSizes.map(s => s._id)
      });
    }
    
    console.log('✅ Updated product references');
    return createdSizes;
  }

  async seedCustomers() {
    console.log('👤 Seeding customers...');
    
    const customers = [
      {
        id_Customer: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '081-234-5678',
        password: await bcrypt.hash('password123', 10),
        address: '123 Main St',
        city: 'Bangkok',
        zipCode: '10110',
        isActive: true
      },
      {
        id_Customer: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '082-345-6789',
        password: await bcrypt.hash('password123', 10),
        address: '456 Secondary Rd',
        city: 'Chiang Mai',
        zipCode: '50000',
        isActive: true
      },
      {
        id_Customer: 3,
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        phone: '083-456-7890',
        password: await bcrypt.hash('admin123', 10),
        address: '789 Admin Ave',
        city: 'Phuket',
        zipCode: '83000',
        isActive: true
      }
    ];

    const createdCustomers = await this.customerModel.insertMany(customers);
    console.log(`✅ Created ${createdCustomers.length} customers`);
    return createdCustomers;
  }

  async seedAll() {
    try {
      console.log('🌱 Starting database seeding...');
      
      // Clear existing data
      await this.clearDatabase();
      
      // Seed in order of dependencies
      const products = await this.seedProducts();
      const colors = await this.seedColors(products);
      const sizes = await this.seedSizes(products, colors);
      const customers = await this.seedCustomers();
      
      console.log('🎉 Database seeding completed successfully!');
      
      // Display summary
      console.log('\n📊 Summary:');
      console.log(`Products: ${products.length}`);
      console.log(`Colors: ${colors.length}`);
      console.log(`Sizes: ${sizes.length}`);
      console.log(`Customers: ${customers.length}`);
      console.log('\n✅ All relationships properly established with FK references');
      
      return {
        success: true,
        data: {
          products: products.length,
          colors: colors.length,
          sizes: sizes.length,
          customers: customers.length
        }
      };
      
    } catch (error) {
      console.error('❌ Database seeding failed:', error);
      throw error;
    }
  }
}