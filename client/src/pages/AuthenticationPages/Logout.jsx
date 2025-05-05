import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function Logout() {

  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('tokenExpiryTime');
  // console.log("logout");
  useEffect(() => {
    <Navigate to="/login" />
  })
  return (
    <div>Logout</div>
  )
}

export default Logout