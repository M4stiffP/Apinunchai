import type { Cart, ApiResponse } from '../../types'

const API_BASE_URL = 'http://localhost:5000/api'

// Utility function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

export const cartAPI = {
  async getCart(): Promise<ApiResponse<Cart>> {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch cart')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch cart')
      }

      // Transform backend cart data to frontend format
      const cartData = data.data
      const cart: Cart = {
        items: cartData.items.map((item: any) => ({
          _id: `${item.product_id}-${item.color_id}-${item.size}`,
          cart_id: cartData.cart_id,
          user_id: cartData.user_id,
          product_id: item.product_id,
          color_id: item.color_id,
          quantity: item.quantity,
          price: item.price,
          addedAt: new Date(),
        })),
        totalAmount: cartData.total,
        totalItems: cartData.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
      }

      return {
        success: true,
        message: 'Cart fetched successfully',
        data: cart
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch cart'
      }
    }
  },

  async addToCart(productId: number, colorId: number, size: string, quantity: number, price: number): Promise<ApiResponse<Cart>> {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          product_id: productId,
          color_id: colorId,
          size,
          quantity,
          price
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add item to cart')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to add item to cart')
      }

      // Transform and return updated cart
      const cartData = data.data
      const cart: Cart = {
        items: cartData.items.map((item: any) => ({
          _id: `${item.product_id}-${item.color_id}-${item.size}`,
          cart_id: cartData.cart_id,
          user_id: cartData.user_id,
          product_id: item.product_id,
          color_id: item.color_id,
          quantity: item.quantity,
          price: item.price,
          addedAt: new Date(),
        })),
        totalAmount: cartData.total,
        totalItems: cartData.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
      }

      return {
        success: true,
        message: 'Item added to cart successfully',
        data: cart
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to add item to cart'
      }
    }
  },

  async updateCartItem(productId: number, colorId: number, size: string, quantity: number): Promise<ApiResponse<Cart>> {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/update`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          product_id: productId,
          color_id: colorId,
          size,
          quantity
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update cart item')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to update cart item')
      }

      // Transform and return updated cart
      const cartData = data.data
      const cart: Cart = {
        items: cartData.items.map((item: any) => ({
          _id: `${item.product_id}-${item.color_id}-${item.size}`,
          cart_id: cartData.cart_id,
          user_id: cartData.user_id,
          product_id: item.product_id,
          color_id: item.color_id,
          quantity: item.quantity,
          price: item.price,
          addedAt: new Date(),
        })),
        totalAmount: cartData.total,
        totalItems: cartData.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
      }

      return {
        success: true,
        message: 'Cart item updated successfully',
        data: cart
      }
    } catch (error) {
      console.error('Error updating cart item:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update cart item'
      }
    }
  },

  async removeFromCart(productId: number, colorId: number, size: string): Promise<ApiResponse<Cart>> {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/remove`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          product_id: productId,
          color_id: colorId,
          size
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to remove item from cart')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to remove item from cart')
      }

      // Transform and return updated cart
      const cartData = data.data
      const cart: Cart = {
        items: cartData.items.map((item: any) => ({
          _id: `${item.product_id}-${item.color_id}-${item.size}`,
          cart_id: cartData.cart_id,
          user_id: cartData.user_id,
          product_id: item.product_id,
          color_id: item.color_id,
          quantity: item.quantity,
          price: item.price,
          addedAt: new Date(),
        })),
        totalAmount: cartData.total,
        totalItems: cartData.items.reduce((sum: number, item: any) => sum + item.quantity, 0),
      }

      return {
        success: true,
        message: 'Item removed from cart successfully',
        data: cart
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to remove item from cart'
      }
    }
  },

  async clearCart(): Promise<ApiResponse<Cart>> {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/clear`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to clear cart')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to clear cart')
      }

      // Return empty cart
      const cart: Cart = {
        items: [],
        totalAmount: 0,
        totalItems: 0,
      }

      return {
        success: true,
        message: 'Cart cleared successfully',
        data: cart
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to clear cart'
      }
    }
  }
}