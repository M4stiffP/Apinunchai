import React, { useState } from 'react'

interface Color {
  color_id: number
  color_name: string
  color_code: string
}

interface Product {
  product_id: number
  brand: string
  model: string
  description: string
  price: number
  stock_quantity: number
  category: string
  images: string[]
  sizes: number[]
  colors: Color[]
}

interface ProductCardProps {
  product: Product
  colors: Color[]
}

const ProductCard: React.FC<ProductCardProps> = ({ product, colors }) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(colors[0] || null)

  const handleViewProduct = () => {
    alert(`Viewing ${product.brand} ${product.model}\nPrice: ฿${product.price.toLocaleString()}\nCategory: ${product.category}`)
  }

  return (
    <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-orange-500/30 overflow-hidden hover:border-orange-500/50 transition-all duration-300 group">
      {/* Product Image */}
      <div className="aspect-square bg-gray-900/50 flex items-center justify-center p-4">
        <div className="text-gray-500 text-center">
          <div className="text-6xl mb-2">👟</div>
          <p className="text-sm">{product.brand} {product.model}</p>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1">
            {product.brand} {product.model}
          </h3>
          <p className="text-orange-400 font-semibold text-lg">
            ฿{product.price.toLocaleString()}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Category & Stock */}
        <div className="mb-4 flex justify-between text-sm">
          <span className="text-gray-400">Category: {product.category}</span>
          <span className="text-green-400">Stock: {product.stock_quantity}</span>
        </div>

        {/* Color Selection */}
        {colors.length > 0 && (
          <div className="mb-4">
            <p className="text-gray-300 text-sm mb-2">
              Color: {selectedColor?.color_name || 'None'}
            </p>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color.color_id}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    selectedColor?.color_id === color.color_id
                      ? 'border-orange-500 ring-2 ring-orange-500/50'
                      : 'border-gray-500 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color.color_code }}
                  title={color.color_name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Available Sizes */}
        <div className="mb-4">
          <p className="text-gray-300 text-sm mb-2">Available Sizes:</p>
          <div className="flex gap-1 flex-wrap">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* View Product Button */}
        <button
          onClick={handleViewProduct}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 
                     rounded-lg font-medium hover:from-orange-700 hover:to-red-700 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 
                     focus:ring-offset-gray-900 transition-all duration-200"
        >
          👁️ View Details
        </button>
      </div>
    </div>
  )
}

export default ProductCard