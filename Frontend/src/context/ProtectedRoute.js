import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const{isLoggedIn} = useAuth()

  return isLoggedIn? children : <Navigate to="/" replace />
}

export default ProtectedRoute