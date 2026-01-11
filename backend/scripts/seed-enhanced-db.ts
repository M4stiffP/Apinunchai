import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Model } from 'mongoose';
import { Product } from '../src/schemas/product.schema';
import { Color } from '../src/schemas/color.schema';
import { Size } from '../src/schemas/size.schema';
import { ProductVariant } from '../src/schemas/product-variant.schema';
import { Customer } from '../src/schemas/customer.schema';
import { Admin } from '../src/schemas/admin.schema';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

async function seedEnhancedDatabase() {
  const app = await NestFactory.create(AppModule);
  
  const productModel = app.get<Model<Product>>(getModelToken(Product.name));
  const colorModel = app.get<Model<Color>>(getModelToken(Color.name));
  const sizeModel = app.get<Model<Size>>(getModelToken(Size.name));
  const variantModel = app.get<Model<ProductVariant>>(getModelToken(ProductVariant.name));
  const customerModel = app.get<Model<Customer>>(getModelToken(Customer.name));
  const adminModel = app.get<Model<Admin>>(getModelToken(Admin.name));

  try {
    console.log('🚀 Seeding enhanced e-commerce database with admin features...');

    // 1. Create Admin Users
    console.log('1. Creating admin users...');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admins = [
      {
        id: 1,
        username: 'superadmin',
        email: 'admin@store.com',
        password: hashedPassword,
        fullName: 'Super Administrator',
        role: 'super_admin',
        permissions: ['*']
      },
      {
        id: 2,
        username: 'productmanager',
        email: 'products@store.com',
        password: hashedPassword,
        fullName: 'Product Manager',
        role: 'product_manager',
        permissions: ['products.*', 'colors.*', 'sizes.*']
      }
    ];

    const createdAdmins = await adminModel.insertMany(admins);
    console.log(`✅ Created ${createdAdmins.length} admin users`);

    // 2. Seed Enhanced Colors with Images and Tags
    console.log('2. Creating enhanced colors with images...');
    const colors = [
      {
        id: 1,
        name: 'Black',
        hexCode: '#000000',
        images: [
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop'
        ],
        primaryImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop',
        tags: ['classic', 'versatile', 'professional']
      },
      {
        id: 2,
        name: 'White',
        hexCode: '#FFFFFF',
        images: [
          'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=300&h=300&fit=crop',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop'
        ],
        primaryImage: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=300&h=300&fit=crop',
        tags: ['clean', 'minimal', 'fresh']
      },
      {
        id: 3,
        name: 'Red',
        hexCode: '#FF0000',
        images: [
          'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=300&fit=crop'
        ],
        primaryImage: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=300&fit=crop',
        tags: ['bold', 'energetic', 'standout']
      },
      {
        id: 4,
        name: 'Blue',
        hexCode: '#0066CC',
        images: [
          'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=300&fit=crop'
        ],
        primaryImage: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=300&fit=crop',
        tags: ['cool', 'calming', 'reliable']
      },
      {
        id: 5,
        name: 'Grey',
        hexCode: '#808080',
        images: [
          'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop'
        ],
        primaryImage: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop',
        tags: ['neutral', 'sophisticated', 'timeless']
      },
      {
        id: 6,
        name: 'Navy',
        hexCode: '#000080',
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop'
        ],
        primaryImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
        tags: ['formal', 'deep', 'elegant']
      }
    ];

    const createdColors = await colorModel.insertMany(colors);
    console.log(`✅ Created ${createdColors.length} enhanced colors`);

    // 3. Seed Enhanced Sizes with Categories
    console.log('3. Creating enhanced sizes with categories...');
    const sizes = [
      { id: 1, name: '38', description: 'Size 38 - EU', category: 'shoe', sortOrder: 1 },
      { id: 2, name: '39', description: 'Size 39 - EU', category: 'shoe', sortOrder: 2 },
      { id: 3, name: '40', description: 'Size 40 - EU', category: 'shoe', sortOrder: 3 },
      { id: 4, name: '41', description: 'Size 41 - EU', category: 'shoe', sortOrder: 4 },
      { id: 5, name: '42', description: 'Size 42 - EU', category: 'shoe', sortOrder: 5 },
      { id: 6, name: '43', description: 'Size 43 - EU', category: 'shoe', sortOrder: 6 },
      { id: 7, name: '44', description: 'Size 44 - EU', category: 'shoe', sortOrder: 7 },
      { id: 8, name: '45', description: 'Size 45 - EU', category: 'shoe', sortOrder: 8 },
      { id: 9, name: 'XS', description: 'Extra Small', category: 'clothing', sortOrder: 1 },
      { id: 10, name: 'S', description: 'Small', category: 'clothing', sortOrder: 2 },
      { id: 11, name: 'M', description: 'Medium', category: 'clothing', sortOrder: 3 },
      { id: 12, name: 'L', description: 'Large', category: 'clothing', sortOrder: 4 },
      { id: 13, name: 'XL', description: 'Extra Large', category: 'clothing', sortOrder: 5 }
    ];

    const createdSizes = await sizeModel.insertMany(sizes);
    console.log(`✅ Created ${createdSizes.length} enhanced sizes`);

    // 4. Seed Enhanced Products with Admin features
    console.log('4. Creating enhanced products...');
    const products = [
      {
        id: 1,
        name: 'HOKA Bondi 8',
        brand: 'HOKA',
        price: 6490,
        description: 'Maximum cushion running shoe with superior comfort',
        category: 'Running',
        images: [
          'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop'
        ],
        tags: ['running', 'comfort', 'cushion', 'premium'],
        status: 'published',
        publishedAt: new Date(),
        createdBy: 'productmanager'
      },
      {
        id: 2,
        name: 'HOKA Clifton 9',
        brand: 'HOKA',
        price: 5990,
        description: 'Lightweight daily trainer for every run',
        category: 'Running',
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop'
        ],
        tags: ['running', 'lightweight', 'daily'],
        status: 'published',
        publishedAt: new Date(),
        createdBy: 'productmanager'
      },
      {
        id: 3,
        name: 'Nike Air Max 270',
        brand: 'NIKE',
        price: 4500,
        description: 'Lifestyle sneaker with Air Max cushioning technology',
        category: 'Lifestyle',
        images: [
          'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop'
        ],
        tags: ['lifestyle', 'air max', 'casual', 'iconic'],
        status: 'published',
        publishedAt: new Date(),
        createdBy: 'productmanager'
      },
      {
        id: 4,
        name: 'Nike Pegasus 40',
        brand: 'NIKE',
        price: 5200,
        description: 'Versatile running shoe for all types of runners',
        category: 'Running',
        status: 'draft',
        createdBy: 'productmanager'
      },
      {
        id: 5,
        name: 'New Balance 327',
        brand: 'NEW BALANCE',
        price: 3600,
        description: 'Retro-inspired casual shoe with modern comfort',
        category: 'Lifestyle',
        tags: ['retro', 'casual', 'heritage'],
        status: 'published',
        publishedAt: new Date(),
        createdBy: 'productmanager'
      },
      {
        id: 6,
        name: 'New Balance Fresh Foam X 1080v12',
        brand: 'NEW BALANCE',
        price: 4800,
        description: 'Premium running shoe with Fresh Foam technology',
        category: 'Running',
        tags: ['running', 'premium', 'technology'],
        status: 'published',
        publishedAt: new Date(),
        createdBy: 'productmanager'
      }
    ];

    const createdProducts = await productModel.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} enhanced products`);

    // 5. Seed Product Variants
    console.log('5. Creating product variants...');
    const variants = [];
    let variantId = 1;

    // Only create variants for published products
    const publishedProducts = createdProducts.filter(p => p.status === 'published');

    for (const product of publishedProducts) {
      let availableColors;
      if (product.brand === 'HOKA') {
        availableColors = [1, 2, 5]; // Black, White, Grey
      } else if (product.brand === 'NIKE') {
        availableColors = [1, 2, 3, 6]; // Black, White, Red, Navy
      } else if (product.brand === 'NEW BALANCE') {
        availableColors = [1, 2, 5]; // Black, White, Grey
      }

      for (const colorId of availableColors) {
        // For shoe sizes 39-43
        for (let sizeId = 2; sizeId <= 6; sizeId++) {
          const color = createdColors.find(c => c.id === colorId);
          const size = createdSizes.find(s => s.id === sizeId);
          
          variants.push({
            id: variantId++,
            productId: product._id,
            colorId: color._id,
            sizeId: size._id,
            stock: Math.floor(Math.random() * 50) + 10,
            images: product.images || []
          });
        }
      }
    }

    const createdVariants = await variantModel.insertMany(variants);
    console.log(`✅ Created ${createdVariants.length} product variants`);

    // 6. Seed Customers
    console.log('6. Creating customers...');
    const customerPassword = await bcrypt.hash('password123', 10);
    const customers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '081-234-5678',
        password: customerPassword
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '082-345-6789',
        password: customerPassword
      },
      {
        id: 3,
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike@example.com',
        phone: '083-456-7890',
        password: customerPassword
      }
    ];

    const createdCustomers = await customerModel.insertMany(customers);
    console.log(`✅ Created ${createdCustomers.length} customers`);

    console.log('\n🎉 Enhanced database seeding completed successfully!\n');

    console.log('📊 Summary:');
    console.log(`Admin Users: ${createdAdmins.length}`);
    console.log(`Enhanced Colors: ${createdColors.length} (with images and tags)`);
    console.log(`Enhanced Sizes: ${createdSizes.length} (with categories)`);
    console.log(`Enhanced Products: ${createdProducts.length} (with admin features)`);
    console.log(`Product Variants: ${createdVariants.length}`);
    console.log(`Customers: ${createdCustomers.length}`);

    console.log('\n🔐 Admin Login Details:');
    console.log('Username: superadmin | Password: admin123');
    console.log('Username: productmanager | Password: admin123');

    console.log('\n✨ New Features Available:');
    console.log('- Colors with multiple images and tags');
    console.log('- Sizes with categories (shoe/clothing)');
    console.log('- Products with draft/published status');
    console.log('- Admin system for managing products');
    console.log('- Image management for colors');

  } catch (error) {
    console.error('❌ Error seeding enhanced database:', error);
  } finally {
    await app.close();
  }
}

seedEnhancedDatabase();