import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './pages/sign_inPage.jsx'
import HomePage from './pages/homePage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SignUp from './pages/SignUpPage.jsx'

function App() {
  return (
    <BrowserRouter>
    
  <Routes>
   <Route path="/" element={<Navigate to="/home" replace />} />
   <Route path="/signin" element={<SignIn />} />
   <Route path="/signup" element={<SignUp />} />
   <Route path="/home" element={<HomePage />} />
   <Route path="/profile/:id" element={<ProfilePage />} />
   <Route path="*" element={<Navigate to="/home" replace />} />
 </Routes>
</BrowserRouter>
     
  
  )
}

export default App