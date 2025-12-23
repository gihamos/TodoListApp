import React from 'react'
import { Navigate } from 'react-router-dom'

function RouteProtect({ children }) {
 
    if (!localStorage.getItem("token")) {
        return <Navigate to="/signin" replace />;
    }
  return (
    <>{children}</>
  )
}

export default RouteProtect