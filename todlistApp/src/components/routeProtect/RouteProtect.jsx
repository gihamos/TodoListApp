import React from 'react'

function routeProtect({children }) {



    if (!localStorage.getItem("token")) {
        return <Navigate to="/signin" replace />;
    }
  return (
    <>{children}</>
  )
}

export default routeProtect