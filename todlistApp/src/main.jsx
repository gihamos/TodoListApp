import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App.jsx'
import { ApiService } from './services/api.service.js'
export const apiService = new ApiService(import.meta.env.VITE_API_BASE_URL, localStorage.getItem('token') || "");
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)