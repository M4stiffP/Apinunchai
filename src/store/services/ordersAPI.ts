import type { Order, ApiResponse } from '../../types'

const API_BASE_URL = 'http://localhost:5000/api'

// Utility function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

export const ordersAPI = {
  async createOrder(orderData: {
    items: Array<{
      product_id: number;
      color_id: number;
      size: string;
      quantity: number;
      price: number;
      subtotal: number;
    }>;
    total: number;
    shippingAddress: {
      firstName: string;
      lastName: string;
      phone: string;
      address: string;
      city: string;
      postalCode: string;
      country?: string;
    };
    paymentMethod: 'credit_card' | 'debit_card' | 'bank_transfer' | 'cash_on_delivery';
    notes?: string;
  }): Promise<ApiResponse<Order>> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error('Failed to create order')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to create order')
      }

      // Transform backend order data to frontend format
      const backendOrder = data.data
      const order: Order = {
        _id: backendOrder.order_id.toString(),
        order_id: backendOrder.order_id,
        user_id: backendOrder.user_id,
        items: backendOrder.items.map((item: any) => ({
          product_id: item.product_id,
          color_id: item.color_id,
          quantity: item.quantity,
          price: item.price,
          product: {} as any, // Will be populated separately
          color: {} as any, // Will be populated separately
        })),
        totalAmount: backendOrder.total,
        status: backendOrder.status,
        shippingAddress: {
          firstName: backendOrder.shippingAddress.firstName,
          lastName: backendOrder.shippingAddress.lastName,
          address: backendOrder.shippingAddress.address,
          phone: backendOrder.shippingAddress.phone,
        },
        paymentMethod: backendOrder.paymentMethod,
        createdAt: new Date(backendOrder.createdAt),
        updatedAt: new Date(backendOrder.updatedAt),
      }

      return {
        success: true,
        message: 'Order created successfully',
        data: order
      }
    } catch (error) {
      console.error('Error creating order:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create order'
      }
    }
  },

  async getOrders(): Promise<ApiResponse<Order[]>> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch orders')
      }

      // Transform backend orders data to frontend format
      const orders: Order[] = data.data.data.map((backendOrder: any) => ({
        _id: backendOrder.order_id.toString(),
        order_id: backendOrder.order_id,
        user_id: backendOrder.user_id,
        items: backendOrder.items.map((item: any) => ({
          product_id: item.product_id,
          color_id: item.color_id,
          quantity: item.quantity,
          price: item.price,
          product: {} as any, // Will be populated separately
          color: {} as any, // Will be populated separately
        })),
        totalAmount: backendOrder.total,
        status: backendOrder.status,
        shippingAddress: {
          firstName: backendOrder.shippingAddress.firstName,
          lastName: backendOrder.shippingAddress.lastName,
          address: backendOrder.shippingAddress.address,
          phone: backendOrder.shippingAddress.phone,
        },
        paymentMethod: backendOrder.paymentMethod,
        createdAt: new Date(backendOrder.createdAt),
        updatedAt: new Date(backendOrder.updatedAt),
      }))

      return {
        success: true,
        message: 'Orders fetched successfully',
        data: orders
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch orders'
      }
    }
  },

  async getOrderById(orderId: number): Promise<ApiResponse<Order>> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Order not found')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch order')
      }

      // Transform backend order data to frontend format
      const backendOrder = data.data
      const order: Order = {
        _id: backendOrder.order_id.toString(),
        order_id: backendOrder.order_id,
        user_id: backendOrder.user_id,
        items: backendOrder.items.map((item: any) => ({
          product_id: item.product_id,
          color_id: item.color_id,
          quantity: item.quantity,
          price: item.price,
          product: {} as any, // Will be populated separately
          color: {} as any, // Will be populated separately
        })),
        totalAmount: backendOrder.total,
        status: backendOrder.status,
        shippingAddress: {
          firstName: backendOrder.shippingAddress.firstName,
          lastName: backendOrder.shippingAddress.lastName,
          address: backendOrder.shippingAddress.address,
          phone: backendOrder.shippingAddress.phone,
        },
        paymentMethod: backendOrder.paymentMethod,
        createdAt: new Date(backendOrder.createdAt),
        updatedAt: new Date(backendOrder.updatedAt),
      }

      return {
        success: true,
        message: 'Order fetched successfully',
        data: order
      }
    } catch (error) {
      console.error('Error fetching order:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch order'
      }
    }
  },

  async cancelOrder(orderId: number): Promise<ApiResponse<Order>> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to cancel order')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Failed to cancel order')
      }

      // Transform backend order data to frontend format
      const backendOrder = data.data
      const order: Order = {
        _id: backendOrder.order_id.toString(),
        order_id: backendOrder.order_id,
        user_id: backendOrder.user_id,
        items: backendOrder.items.map((item: any) => ({
          product_id: item.product_id,
          color_id: item.color_id,
          quantity: item.quantity,
          price: item.price,
          product: {} as any, // Will be populated separately
          color: {} as any, // Will be populated separately
        })),
        totalAmount: backendOrder.total,
        status: backendOrder.status,
        shippingAddress: {
          firstName: backendOrder.shippingAddress.firstName,
          lastName: backendOrder.shippingAddress.lastName,
          address: backendOrder.shippingAddress.address,
          phone: backendOrder.shippingAddress.phone,
        },
        paymentMethod: backendOrder.paymentMethod,
        createdAt: new Date(backendOrder.createdAt),
        updatedAt: new Date(backendOrder.updatedAt),
      }

      return {
        success: true,
        message: 'Order cancelled successfully',
        data: order
      }
    } catch (error) {
      console.error('Error cancelling order:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to cancel order'
      }
    }
  }
}