import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from '../store/store'
import { setLoading } from '../store/slices/uiSlice'

// Import components
import MainApp from './MainApp'
import LoadingScreen from './LoadingScreen'
import CertificatePage from './CertificatePage'

const RoutingApp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // Initialize app
    dispatch(setLoading(true))
    
    const timer = setTimeout(() => {
      dispatch(setLoading(false))
    }, 1500)

    return () => clearTimeout(timer)
  }, [dispatch])

  return (
    <div className="min-h-screen bg-anime-dark">
      <LoadingScreen />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainApp />} />
          <Route path="/certificates" element={<CertificatePage />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  )
}

export default RoutingApp