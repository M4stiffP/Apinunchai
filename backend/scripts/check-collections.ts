/**
 * Collection Inspector
 * 
 * Displays all collections in the database with document counts.
 * 
 * Usage: npm run check-collections
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../src/schemas/customer.schema';
import { Product } from '../src/schemas/product.schema';
import { Admin } from '../src/schemas/admin.schema';
import { Color } from '../src/schemas/color.schema';
import { Size } from '../src/schemas/size.schema';
import { ProductVariant } from '../src/schemas/product-variant.schema';

async function checkCollections() {
  console.log('🔍 Inspecting database collections...\n');
  
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Get models
    const customerModel = app.get<Model<Customer>>(getModelToken('Customer'));
    const productModel = app.get<Model<Product>>(getModelToken('Product'));
    const adminModel = app.get<Model<Admin>>(getModelToken('Admin'));
    const colorModel = app.get<Model<Color>>(getModelToken('Color'));
    const sizeModel = app.get<Model<Size>>(getModelToken('Size'));
    const variantModel = app.get<Model<ProductVariant>>(getModelToken('ProductVariant'));

    const db = customerModel.db;
    
    // List all collections
    const collections = await db.listCollections();
    
    if (collections.length === 0) {
      console.log('📭 Database is empty - no collections found');
      console.log('\n💡 Run `npm run seed-fresh` to populate the database');
      return;
    }

    console.log(`📊 Found ${collections.length} collections:\n`);

    // Get document counts for each collection
    const collectionStats = [];
    
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      collectionStats.push({ name: col.name, count });
    }

    // Sort by count descending
    collectionStats.sort((a, b) => b.count - a.count);

    // Display formatted results
    collectionStats.forEach(stat => {
      const icon = getCollectionIcon(stat.name);
      const padding = ' '.repeat(Math.max(0, 20 - stat.name.length));
      console.log(`${icon} ${stat.name}${padding} ${stat.count.toLocaleString()} documents`);
    });

    // Calculate totals
    const totalDocs = collectionStats.reduce((sum, stat) => sum + stat.count, 0);
    console.log(`\n📈 Total documents: ${totalDocs.toLocaleString()}`);
    
    // Check if database is properly seeded
    const hasProducts = collectionStats.find(s => s.name === 'products')?.count > 0;
    const hasAdmins = collectionStats.find(s => s.name === 'admins')?.count > 0;
    
    console.log('\n🎯 Database Status:');
    if (hasProducts && hasAdmins) {
      console.log('✅ Database is properly seeded and ready for use!');
    } else {
      console.log('⚠️  Database may need seeding');
      console.log('💡 Run `npm run seed-fresh` to populate with fresh data');
    }

  } catch (error) {
    console.error('❌ Error inspecting collections:', error);
  } finally {
    await app.close();
  }
}

function getCollectionIcon(collectionName: string): string {
  const icons: Record<string, string> = {
    'admins': '👤',
    'customers': '👥',
    'products': '👟',
    'colors': '🎨',
    'sizes': '📏',
    'product_variants': '🔄',
    'orders': '🛒',
    'order_items': '📦',
  };
  return icons[collectionName] || '📄';
}

checkCollections();