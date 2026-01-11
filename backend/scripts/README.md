# Database Scripts

This directory contains database management scripts for the e-commerce backend.

## Available Scripts

### 🗑️ Clear Database
```bash
npm run clear-db
```
Safely drops all collections in the database to prepare for fresh seeding.

### 🔍 Check Collections
```bash
npm run check-collections
```
Lists all collections in the database with document counts.

### 🌱 Seed Enhanced Database
```bash
npm run seed-enhanced
```
Seeds the database with enhanced admin features (legacy compatibility maintained).

### 🚀 Seed Fresh Database (Recommended)
```bash
npm run seed-fresh
```
Creates a complete e-commerce database with:
- **Real HOKA Products**: 6 authentic shoe models with accurate pricing
- **Color Management**: 6 colors with multiple images per color
- **Admin System**: Role-based user management
- **Customer Accounts**: Test user accounts
- **Product Variants**: 360 variants (6 products × 6 colors × 10 sizes)
- **Realistic Stock**: Popular sizes have higher stock quantities

## Complete Setup Process

```bash
# 1. Clear existing data
npm run clear-db

# 2. Seed with fresh data
npm run seed-fresh

# 3. Verify setup
npm run check-collections
```

## Login Credentials

### Admin Users
- **Super Admin**: `superadmin` / `admin123`
- **Product Manager**: `productmanager` / `admin123`

### Test Customers
- `john.smith@email.com` / `password123`
- `marie.johnson@email.com` / `password123`
- `somchai@email.com` / `password123`

## Database Statistics

After running `seed-fresh`:
- **Admin Users**: 2
- **Customers**: 3  
- **HOKA Products**: 6
- **Colors**: 6 (with real images)
- **Shoe Sizes**: 10 (38-47)
- **Product Variants**: 360
- **Total Stock**: ~8,000+ pieces

---

*Created: November 21, 2025*  
*Ready for production use* ✨