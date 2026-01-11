/**
 * Database Cleaner
 * 
 * Safely drops all collections in the database to prepare for fresh seeding.
 * 
 * Usage: npm run clear-db
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../src/schemas/customer.schema';
import { Product } from '../src/schemas/product.schema';

async function clearDatabase() {
  console.log('🗑️  Starting database cleanup...');
  
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    // Get any model to access database
    const customerModel = app.get<Model<Customer>>(getModelToken('Customer'));
    const db = customerModel.db;
    
    // List and drop all collections
    const collections = await db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log('📭 Database is already empty');
    } else {
      console.log(`🔍 Found ${collections.length} collections to drop...`);
      
      for (const collection of collections) {
        try {
          await db.collection(collection.name).drop();
          console.log(`✅ Dropped collection: ${collection.name}`);
        } catch (e) {
          console.log(`⚠️  Collection ${collection.name} already dropped`);
        }
      }
    }

    console.log('🎉 Database cleared successfully!');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
  } finally {
    await app.close();
  }
}

clearDatabase();