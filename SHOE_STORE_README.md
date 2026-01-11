# 🛒 Shoe Store Final Project

## 📋 Project Overview

This is a comprehensive e-commerce shoe store application built with React.js, TypeScript, and Vite. The application features a complete shopping system with user authentication, product browsing, cart management, and order processing.

## 🌟 Features

### 🔐 Authentication System
- **User Registration**: Complete signup form with validation
- **User Login**: Secure authentication with mock JWT tokens
- **Protected Routes**: AuthGuard component to protect sensitive pages
- **User Session**: Persistent login state with localStorage

### 🛍️ Shopping Features
- **Product Catalog**: Browse all available shoes from HOKA, Nike, and New Balance
- **Product Details**: View detailed information, descriptions, and prices
- **Color Selection**: Choose from multiple color variants for each product
- **Search & Filter**: Search by brand, model, or description
- **Brand Filtering**: Filter products by specific brands

### 🛒 Cart Management
- **Add to Cart**: Add products with selected colors to shopping cart
- **Quantity Control**: Increase/decrease quantities or remove items
- **Cart Summary**: Real-time total calculation
- **Persistent Cart**: Cart state preserved across sessions

### 🎨 UI/UX Features
- **Consistent Design**: Matches the main Gachiakuta website theme
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Loading States**: Beautiful loading animations and indicators
- **Error Handling**: User-friendly error messages and validation
- **Navigation**: Integrated menu system with cart badge and user info

## 🛠️ Technology Stack

### Frontend
- **React.js 19.1.1**: Modern React with hooks and functional components
- **TypeScript 5.9.3**: Type safety and better development experience
- **Vite.js 7.1.7**: Fast development server and build tool
- **Redux Toolkit 2.9.2**: State management for auth, cart, and products
- **React Router DOM 7.9.5**: Client-side routing and navigation
- **Tailwind CSS**: Utility-first styling framework

### Development Tools
- **ESLint**: Code linting and style enforcement
- **TypeScript**: Static type checking
- **Vite**: Fast HMR and optimized builds

## 📁 Project Structure

```
finalproject/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AuthGuard.tsx    # Route protection component
│   │   ├── Header.tsx       # Navigation component (updated)
│   │   ├── MainApp.tsx      # Main landing page
│   │   ├── ProductCard.tsx  # Product display component
│   │   └── RoutingApp.tsx   # Main router configuration
│   ├── pages/              # Page components
│   │   ├── LoginPage.tsx   # User login form
│   │   ├── RegisterPage.tsx # User registration form
│   │   ├── ShopPage.tsx    # Product browsing page
│   │   └── CartPage.tsx    # Shopping cart page
│   ├── store/              # Redux store configuration
│   │   ├── slices/         # Redux slices
│   │   │   ├── authSlice.ts     # Authentication state
│   │   │   ├── productsSlice.ts # Product management
│   │   │   ├── cartSlice.ts     # Shopping cart state
│   │   │   ├── ordersSlice.ts   # Order management
│   │   │   └── uiSlice.ts       # UI state (existing)
│   │   ├── services/       # API services
│   │   │   ├── authAPI.ts       # Authentication API
│   │   │   └── productsAPI.ts   # Products API
│   │   └── store.ts        # Store configuration
│   ├── types/              # TypeScript definitions
│   │   └── index.ts        # All type definitions
│   └── main.tsx           # Application entry point
├── database/              # Database files
│   ├── finalproject.product.json  # Product data
│   └── finalproject.colors.json   # Color variants data
├── MONGODB_SCHEMA.md      # Database schema documentation
└── package.json          # Project dependencies
```

## 🔧 Installation & Setup

1. **Clone and Navigate**
   ```bash
   cd finalproject
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## 🗄️ Database Design

### MongoDB Collections
- **users**: User accounts and profiles
- **products**: Shoe product information
- **colors**: Product color variants
- **cart**: Shopping cart items
- **orders**: Order history and details

### Relationships
- Users → Cart (One-to-Many)
- Users → Orders (One-to-Many)
- Products → Colors (One-to-Many)
- Products → Cart Items (One-to-Many)

See `MONGODB_SCHEMA.md` for complete database documentation.

## 🎯 Demo Credentials

For testing the application:
- **Username**: `admin`
- **Password**: `password`

## 📝 API Structure

### Mock API Services
- **Authentication**: Login, register, logout operations
- **Products**: Fetch all products, search, filter by brand
- **Cart**: Add/remove items, update quantities
- **Orders**: Create orders, view order history

All APIs are currently mock implementations ready for real backend integration.

## 🎨 Design Features

### Color Scheme
- Matches the main Gachiakuta website theme
- Orange/red gradient backgrounds
- Black/dark overlays for readability
- Consistent typography and spacing

### User Experience
- Intuitive navigation with menu overlay
- Real-time cart updates
- Form validation with helpful error messages
- Loading states for all async operations
- Mobile-responsive design

## 🔐 Security Features

- Protected routes with authentication guards
- Password visibility toggles
- Input validation and sanitization
- JWT token-based authentication (mock)
- Secure state management

## 📊 Product Data

### Included Brands
- **HOKA**: Bondi 8, Bondi 9 Wide, Hopara 2, Kawana, Mach 6, Rincon 4 Wide
- **NEW BALANCE**: 327, 530, Fresh Foam X 1080v14 2E, FuelCell Rebel v4/v5
- **NIKE**: Air Max Alpha Trainer, Alphafly 3, Pegasus 41, Vomero 18, Zoom Fly 6

### Product Information
- Complete product descriptions
- Multiple color variants with images
- Pricing in Thai Baht (฿)
- High-quality product images

## 🚀 Future Enhancements

### Backend Integration
- Real MongoDB database connection
- Express.js API server
- User authentication with bcrypt
- File upload for product images

### Additional Features
- Order tracking and status updates
- Payment gateway integration
- Product reviews and ratings
- Wishlist functionality
- Admin panel for product management

### Performance Optimization
- Image lazy loading
- Product pagination
- Search result caching
- PWA capabilities

## 📄 License

This project is developed as part of a final project assignment.

## 👥 Author

Student ID: 0330535

---

**Note**: This application includes a complete e-commerce shopping system integrated with the existing Gachiakuta website theme. All shop functionality is accessible through the navigation menu, and the database schema is ready for MongoDB implementation.