import {BrowserRouter, Routes, Route} from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/login/Login.jsx'
import Admin from './pages/admin/Admin.jsx'
import { ProdutosProvider } from './context/produtosProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <ProdutosProvider>
        <Route path="/" element={<App />} />
      </ProdutosProvider>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />

    </Routes>
  </BrowserRouter>
)
