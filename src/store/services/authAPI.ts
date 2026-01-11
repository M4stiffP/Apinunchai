import type { LoginCredentials, RegisterData, AuthResponse, User } from '../../types'

const API_BASE_URL = 'http://localhost:5000/api'

// Real authentication service
export const authAPI = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      if (data.success && data.data) {
        // Store token and user data
        localStorage.setItem('token', data.data.access_token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
        
        return {
          success: true,
          message: data.message,
          data: {
            user: data.data.user,
            token: data.data.access_token
          }
        }
      } else {
        throw new Error(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw new Error(error instanceof Error ? error.message : 'Login failed')
    }
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      if (data.success) {
        return {
          success: true,
          message: data.message || 'Registration successful',
        }
      } else {
        throw new Error(data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw new Error(error instanceof Error ? error.message : 'Registration failed')
    }
  },

  async logout(): Promise<void> {
    try {
      // Clear local storage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Optionally call backend logout endpoint if it exists
      // await fetch(`${API_BASE_URL}/auth/logout`, {
      //   method: 'POST',
      //   headers: getAuthHeaders(),
      // })
    } catch (error) {
      console.error('Logout error:', error)
      // Still clear local storage even if backend call fails
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        return null
      }

      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        // Token is invalid, clear it
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return null
      }

      const data = await response.json()
      
      if (data.success && data.data?.user) {
        localStorage.setItem('user', JSON.stringify(data.data.user))
        return data.data.user
      }

      return null
    } catch (error) {
      console.error('Get current user error:', error)
      // Fallback to local storage
      const userString = localStorage.getItem('user')
      return userString ? JSON.parse(userString) : null
    }
  },

  async refreshToken(): Promise<AuthResponse> {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token to refresh')
      }

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Token refresh failed')
      }

      if (data.success && data.data) {
        localStorage.setItem('token', data.data.access_token)
        
        return {
          success: true,
          message: data.message,
          data: {
            user: JSON.parse(localStorage.getItem('user') || '{}'),
            token: data.data.access_token
          }
        }
      } else {
        throw new Error(data.message || 'Token refresh failed')
      }
    } catch (error) {
      console.error('Refresh token error:', error)
      throw new Error(error instanceof Error ? error.message : 'Token refresh failed')
    }
  }
}

// HTTP client configuration
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
}

// Utility function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` 
  } : {
    'Content-Type': 'application/json'
  }
}