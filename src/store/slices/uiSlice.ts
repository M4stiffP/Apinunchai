import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  isMobileMenuOpen: boolean
  isLoading: boolean
}

const initialState: UiState = {
  isMobileMenuOpen: false,
  isLoading: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
      // Prevent body scroll when menu is open
      if (typeof document !== 'undefined') {
        if (state.isMobileMenuOpen) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'unset'
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false
      // Restore body scroll
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset'
      }
    },
  },
})

export const { toggleMobileMenu, setLoading, closeMobileMenu } = uiSlice.actions
export default uiSlice.reducer