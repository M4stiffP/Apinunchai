import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'

// Static product data
const STATIC_PRODUCTS = [
  {
    product_id: 1,
    brand: 'HOKA',
    model: 'Bondi 8',
    description: 'Maximum cushion running shoe',
    price: 6490,
    stock_quantity: 10,
    category: 'Running',
    images: ['/images/shoe/hoka-bondi-8.jpg'],
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { color_id: 1, color_name: 'Black', color_code: '#000000' },
      { color_id: 2, color_name: 'White', color_code: '#FFFFFF' }
    ]
  },
  {
    product_id: 2,
    brand: 'HOKA',
    model: 'Bondi 9 Wide',
    description: 'Wide fit maximum cushion shoe',
    price: 6990,
    stock_quantity: 8,
    category: 'Running',
    images: ['/images/shoe/hoka-bondi-9.jpg'],
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { color_id: 3, color_name: 'Navy', color_code: '#000080' },
      { color_id: 4, color_name: 'Grey', color_code: '#808080' }
    ]
  },
  {
    product_id: 3,
    brand: 'HOKA',
    model: 'Hopara 2',
    description: 'Adventure hiking shoe',
    price: 5490,
    stock_quantity: 15,
    category: 'Hiking',
    images: ['/images/shoe/hoka-hopara-2.jpg'],
    sizes: [39, 40, 41, 42, 43, 44],
    colors: [
      { color_id: 5, color_name: 'Brown', color_code: '#8B4513' },
      { color_id: 6, color_name: 'Olive', color_code: '#556B2F' }
    ]
  },
  {
    product_id: 4,
    brand: 'HOKA',
    model: 'Kawana 2',
    description: 'Daily training running shoe',
    price: 5490,
    stock_quantity: 12,
    category: 'Running',
    images: ['/images/shoe/hoka-kawana-2.jpg'],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    colors: [
      { color_id: 7, color_name: 'Blue', color_code: '#0066CC' },
      { color_id: 8, color_name: 'Red', color_code: '#CC0000' }
    ]
  },
  {
    product_id: 5,
    brand: 'HOKA',
    model: 'Mach 6',
    description: 'Lightweight performance shoe',
    price: 5990,
    stock_quantity: 7,
    category: 'Running',
    images: ['/images/shoe/hoka-mach-6.jpg'],
    sizes: [39, 40, 41, 42, 43, 44],
    colors: [
      { color_id: 9, color_name: 'Orange', color_code: '#FF6600' },
      { color_id: 10, color_name: 'Green', color_code: '#00CC66' }
    ]
  },
  {
    product_id: 6,
    brand: 'HOKA',
    model: 'Rincon 4 Wide',
    description: 'Lightweight wide fit shoe',
    price: 4990,
    stock_quantity: 20,
    category: 'Running',
    images: ['/images/shoe/hoka-rincon-4.jpg'],
    sizes: [40, 41, 42, 43, 44, 45],
    colors: [
      { color_id: 11, color_name: 'Purple', color_code: '#6600CC' },
      { color_id: 12, color_name: 'Yellow', color_code: '#FFCC00' }
    ]
  }
]

const ShopPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string>('')

  // Filter products based on search and brand
  const filteredProducts = STATIC_PRODUCTS.filter(product => {
    const matchesSearch = product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesBrand = !selectedBrand || product.brand === selectedBrand
    
    return matchesSearch && matchesBrand
  })

  // Get unique brands for filter
  const brands = [...new Set(STATIC_PRODUCTS.map(product => product.brand))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-purple-900">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-orange-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">
              🛒 HOKA Shoe Store
            </h1>
            
            <div className="flex items-center gap-4">
              <a href="/" className="text-orange-400 hover:text-orange-300">
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-orange-500/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Search Products
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by brand, model, or description..."
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg 
                             text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                             focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Filter by Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg 
                             text-white focus:outline-none focus:ring-2 focus:ring-orange-500 
                             focus:border-transparent"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.product_id}
              product={product}
              colors={product.colors}
            />
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
            <p className="text-gray-400">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* Products Count */}
        {filteredProducts.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-300">
              Showing {filteredProducts.length} of {STATIC_PRODUCTS.length} products
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default ShopPage