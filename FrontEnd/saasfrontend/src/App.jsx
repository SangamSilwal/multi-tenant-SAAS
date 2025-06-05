
import { useState } from 'react'
import { BrowserRouter,Route,Routes, Navigate } from 'react-router-dom'
import { GoogleToLogin } from './components/GoogleLogin'
import { DashboardCom } from './components/Dashboard'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='37742205425-aerr4tfjmlkggng9rrvpnhkbjgmf8ghm.apps.googleusercontent.com'>
        <GoogleToLogin></GoogleToLogin>
      </GoogleOAuthProvider>
    )
  }
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<GoogleAuthWrapper/>}/>
      <Route path="/dasboard" element={<DashboardCom/>}/>
      <Route to="/" element={<Navigate to={"/login"}/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
