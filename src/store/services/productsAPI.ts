import type { Product, Color, ApiResponse } from '../../types'

const API_BASE_URL = 'http://localhost:5000/api'

// Utility function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

export const productsAPI = {
  async getAllProducts(): Promise<ApiResponse<{ products: Product[], colors: Color[] }>> {
    try {
      // Fetch products and colors in parallel
      const [productsResponse, colorsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/products`, {
          method: 'GET',
          headers: getAuthHeaders(),
        }),
        fetch(`${API_BASE_URL}/colors`, {
          method: 'GET',
          headers: getAuthHeaders(),
        })
      ])

      if (!productsResponse.ok || !colorsResponse.ok) {
        throw new Error('Failed to fetch data')
      }

      const [productsData, colorsData] = await Promise.all([
        productsResponse.json(),
        colorsResponse.json()
      ])

      // Backend returns arrays directly, not wrapped in success/data structure
      const products = productsData.map((product: any) => ({
        _id: product._id,
        product_id: product.product_id,
        brand: product.brand,
        model: product.model,
        price: product.price,
        description: product.description,
        images: product.images || [],
        variants: product.variants || [],
        rating: product.rating || 0,
        reviewCount: product.reviewCount || 0,
        category: product.category || 'Shoes',
        __v: product.__v || 0
      }))

      const colors = colorsData.map((color: any) => ({
        _id: color._id,
        color_id: color.color_id,
        color_name: color.color_name,
        colortag: color.colortag,
        imageUrl: color.imageUrl || '',
        product_id: color.product_id || 0,
        __v: color.__v || 0
      }))

      return {
        success: true,
        message: 'Products fetched successfully',
        data: {
          products,
          colors
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch products'
      }
    }
  },

  async getProductById(productId: number): Promise<ApiResponse<Product>> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Product not found')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch product')
      }

      // Transform backend data to frontend format
      const product = {
        _id: data.data.product_id.toString(),
        product_id: data.data.product_id,
        brand: data.data.brand,
        model: data.data.name.replace(`${data.data.brand} `, ''),
        price: data.data.price,
        description: data.data.description,
        images: data.data.images || [],
        variants: data.data.variants || [],
        rating: data.data.rating || 0,
        reviewCount: data.data.reviewCount || 0,
        category: data.data.category,
        __v: 0
      }

      return {
        success: true,
        message: 'Product fetched successfully',
        data: product
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch product'
      }
    }
  },

  async getColorsByProductId(productId: number): Promise<ApiResponse<Color[]>> {
    try {
      // Get product to access its variants
      const productResponse = await this.getProductById(productId)
      
      if (!productResponse.success || !productResponse.data) {
        throw new Error('Product not found')
      }

      // Get all colors
      const colorsResponse = await fetch(`${API_BASE_URL}/colors`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      if (!colorsResponse.ok) {
        throw new Error('Failed to fetch colors')
      }

      const colorsData = await colorsResponse.json()

      if (!colorsData.success) {
        throw new Error('Failed to fetch colors')
      }

      // Filter colors based on product variants
      const productVariants = productResponse.data.variants || []
      const allColors = colorsData.data
      
      const productColors = productVariants.map((variant: any) => {
        const color = allColors.find((c: any) => c.color_id === variant.color_id)
        if (color) {
          return {
            _id: color.color_id.toString(),
            color_id: color.color_id,
            color_name: color.name,
            colortag: color.hex,
            imageUrl: productResponse.data?.images?.[0] || '', // Use first image as fallback
            product_id: productId,
            __v: 0
          }
        }
        return null
      }).filter((color): color is NonNullable<typeof color> => color !== null) as Color[]

      return {
        success: true,
        message: 'Colors fetched successfully',
        data: productColors
      }
    } catch (error) {
      console.error('Error fetching colors:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch colors'
      }
    }
  },

  async searchProducts(query: string): Promise<ApiResponse<Product[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Search failed')
      }

      // Transform backend data to frontend format
      const products = data.data.data.map((product: any) => ({
        _id: product.product_id.toString(),
        product_id: product.product_id,
        brand: product.brand,
        model: product.name.replace(`${product.brand} `, ''),
        price: product.price,
        description: product.description,
        images: product.images || [],
        variants: product.variants || [],
        rating: product.rating || 0,
        reviewCount: product.reviewCount || 0,
        category: product.category,
        __v: 0
      }))

      return {
        success: true,
        message: 'Search completed successfully',
        data: products
      }
    } catch (error) {
      console.error('Error searching products:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Search failed'
      }
    }
  },

  async getProductsByBrand(brand: string): Promise<ApiResponse<Product[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/products?brand=${encodeURIComponent(brand)}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch products by brand')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch products by brand')
      }

      // Transform backend data to frontend format
      const products = data.data.data.map((product: any) => ({
        _id: product.product_id.toString(),
        product_id: product.product_id,
        brand: product.brand,
        model: product.name.replace(`${product.brand} `, ''),
        price: product.price,
        description: product.description,
        images: product.images || [],
        variants: product.variants || [],
        rating: product.rating || 0,
        reviewCount: product.reviewCount || 0,
        category: product.category,
        __v: 0
      }))

      return {
        success: true,
        message: 'Products by brand fetched successfully',
        data: products
      }
    } catch (error) {
      console.error('Error fetching products by brand:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch products by brand'
      }
    }
  },

  async getBrands(): Promise<ApiResponse<string[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/brands`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch brands')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch brands')
      }

      return {
        success: true,
        message: 'Brands fetched successfully',
        data: data.data
      }
    } catch (error) {
      console.error('Error fetching brands:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch brands'
      }
    }
  },

  async getCategories(): Promise<ApiResponse<string[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch categories')
      }

      return {
        success: true,
        message: 'Categories fetched successfully',
        data: data.data
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch categories'
      }
    }
  }
}