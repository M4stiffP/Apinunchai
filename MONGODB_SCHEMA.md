# MongoDB Database Schema for Shoe Store

## Database Structure

This document outlines the MongoDB database schema for the shoe store application, including collections, relationships, and indexes.

## Collections

### 1. Users Collection
**Collection Name:** `users`
**Purpose:** Store user account information

```javascript
{
  _id: ObjectId,           // MongoDB Primary Key
  user_id: Number,         // Custom Primary Key (auto-increment)
  username: String,        // Unique username
  email: String,           // Unique email address
  password_hash: String,   // Hashed password (bcrypt)
  firstName: String,       // User's first name
  lastName: String,        // User's last name
  phone: String,           // Phone number (optional)
  address: String,         // Address (optional)
  role: String,            // 'user' | 'admin'
  isActive: Boolean,       // Account status
  createdAt: Date,         // Account creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

**Indexes:**
- `user_id`: Unique index
- `username`: Unique index
- `email`: Unique index

### 2. Products Collection
**Collection Name:** `products`
**Purpose:** Store product information (shoes)

```javascript
{
  _id: ObjectId,           // MongoDB Primary Key
  product_id: Number,      // Custom Primary Key (auto-increment)
  brand: String,           // Shoe brand (HOKA, NIKE, NEW BALANCE)
  model: String,           // Shoe model name
  price: Number,           // Price in Thai Baht
  description: String,     // Detailed product description
  category: String,        // Product category
  isActive: Boolean,       // Product availability
  stock: Number,           // Total stock quantity
  createdAt: Date,         // Product creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

**Indexes:**
- `product_id`: Unique index
- `brand`: Index for filtering
- `price`: Index for sorting
- `isActive`: Index for filtering

### 3. Colors Collection
**Collection Name:** `colors`
**Purpose:** Store color variants for products

```javascript
{
  _id: ObjectId,           // MongoDB Primary Key
  color_id: Number,        // Custom Primary Key (auto-increment)
  product_id: Number,      // Foreign Key to products.product_id
  color_name: String,      // Color name (Black, White, Red, etc.)
  colortag: String,        // Hex color code (#FFFFFF)
  imageUrl: String,        // Product image URL for this color
  stock: Number,           // Stock for this specific color
  isActive: Boolean,       // Color availability
  createdAt: Date,         // Color creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

**Indexes:**
- `color_id`: Unique index
- `product_id`: Index for joins
- `isActive`: Index for filtering

### 4. Cart Collection
**Collection Name:** `cart`
**Purpose:** Store user shopping cart items

```javascript
{
  _id: ObjectId,           // MongoDB Primary Key
  cart_id: Number,         // Custom Primary Key (auto-increment)
  user_id: Number,         // Foreign Key to users.user_id
  product_id: Number,      // Foreign Key to products.product_id
  color_id: Number,        // Foreign Key to colors.color_id
  quantity: Number,        // Quantity of items
  price: Number,           // Price per item at time of adding
  addedAt: Date,           // When item was added to cart
  updatedAt: Date          // Last update timestamp
}
```

**Indexes:**
- `cart_id`: Unique index
- `user_id`: Index for user cart queries
- Compound index: `(user_id, product_id, color_id)` - unique

### 5. Orders Collection
**Collection Name:** `orders`
**Purpose:** Store order information

```javascript
{
  _id: ObjectId,           // MongoDB Primary Key
  order_id: Number,        // Custom Primary Key (auto-increment)
  user_id: Number,         // Foreign Key to users.user_id
  items: [                 // Array of order items
    {
      product_id: Number,  // Foreign Key to products.product_id
      color_id: Number,    // Foreign Key to colors.color_id
      quantity: Number,    // Quantity ordered
      price: Number,       // Price per item at time of order
      subtotal: Number     // quantity * price
    }
  ],
  totalAmount: Number,     // Total order amount
  status: String,          // 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: {       // Shipping information
    firstName: String,
    lastName: String,
    address: String,
    phone: String,
    postalCode: String,
    city: String,
    province: String
  },
  paymentMethod: String,   // 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash_on_delivery'
  paymentStatus: String,   // 'pending' | 'paid' | 'failed' | 'refunded'
  tracking: {              // Shipping tracking
    trackingNumber: String,
    carrier: String,
    estimatedDelivery: Date
  },
  createdAt: Date,         // Order creation timestamp
  updatedAt: Date          // Last update timestamp
}
```

**Indexes:**
- `order_id`: Unique index
- `user_id`: Index for user order queries
- `status`: Index for filtering
- `createdAt`: Index for sorting

### 6. Order History Collection
**Collection Name:** `order_history`
**Purpose:** Track order status changes

```javascript
{
  _id: ObjectId,           // MongoDB Primary Key
  order_id: Number,        // Foreign Key to orders.order_id
  status: String,          // New status
  previousStatus: String,  // Previous status
  changedBy: Number,       // user_id who made the change
  note: String,            // Optional note about the change
  timestamp: Date          // When the status changed
}
```

**Indexes:**
- `order_id`: Index for order tracking
- `timestamp`: Index for sorting

## Relationships

### Primary Keys and Foreign Keys:

1. **users.user_id** → **cart.user_id** (One-to-Many)
2. **users.user_id** → **orders.user_id** (One-to-Many)
3. **products.product_id** → **colors.product_id** (One-to-Many)
4. **products.product_id** → **cart.product_id** (One-to-Many)
5. **colors.color_id** → **cart.color_id** (One-to-Many)
6. **orders.order_id** → **order_history.order_id** (One-to-Many)

## Auto-increment Implementation

Since MongoDB doesn't have auto-increment like SQL databases, we'll implement it using a counters collection:

### Counters Collection
```javascript
{
  _id: String,             // Collection name (e.g., "users", "products")
  sequence_value: Number   // Current counter value
}
```

## Sample Data

### Products Sample:
```javascript
[
  {
    "product_id": 1,
    "brand": "HOKA",
    "model": "Bondi 8",
    "price": 6490,
    "description": "Experience the ultimate in plush comfort...",
    "category": "running",
    "isActive": true,
    "stock": 50,
    "createdAt": new Date(),
    "updatedAt": new Date()
  }
]
```

### Colors Sample:
```javascript
[
  {
    "color_id": 1,
    "product_id": 1,
    "color_name": "Black",
    "colortag": "#1A1C1D",
    "imageUrl": "https://i.postimg.cc/mD8fZ84c/HK-Bondi8-Black.png",
    "stock": 10,
    "isActive": true,
    "createdAt": new Date(),
    "updatedAt": new Date()
  }
]
```

## Database Connection Configuration

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## Migration Scripts

Scripts to migrate existing JSON data to MongoDB collections:

1. **Import Products**: Convert `finalproject.product.json`
2. **Import Colors**: Convert `finalproject.colors.json`
3. **Create Indexes**: Set up all required indexes
4. **Initialize Counters**: Set up auto-increment sequences

## Security Considerations

1. **Password Hashing**: Use bcrypt for password hashing
2. **Input Validation**: Validate all inputs using mongoose schemas
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **Authentication**: Use JWT tokens for user authentication
5. **CORS**: Configure CORS properly for web requests

## Performance Optimization

1. **Indexing**: Create appropriate indexes for frequently queried fields
2. **Aggregation**: Use MongoDB aggregation pipelines for complex queries
3. **Connection Pooling**: Use connection pooling for database connections
4. **Caching**: Implement Redis caching for frequently accessed data

This schema provides a solid foundation for the shoe store application with proper relationships, indexing, and scalability considerations.