import React from 'react'
import { Navigate } from 'react-router-dom'

function LogoutComponent() {
    localStorage.removeItem("token");
  return (
    <Navigate to={"/sigin"} replace={true}/>
  )
}

export default LogoutComponent
