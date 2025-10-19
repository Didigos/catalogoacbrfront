import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/login/Login.jsx";
import Admin from "./pages/admin/Admin.jsx";
import { ProdutosProvider } from "./context/produtosProvider.jsx";
import { TaxasProvider } from "./context/taxasProvider.jsx";
import { UserProvider } from "./context/UserProvider.jsx";
import Produtos from "./pages/Produtos/Produtos.jsx";
import ProdutoForm from "./pages/ProdutoForm/ProdutoForm.jsx";
import ProdutoAdd from "./pages/addProduto/ProdutoAdd.jsx";
import Taxa from "./pages/Taxa/Taxa.jsx";
import Peliculas from "./pages/peliculas/Peliculas.jsx";
 

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <UserProvider>
    <TaxasProvider>
      <ProdutosProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/:id" element={<ProdutoForm />} />
          <Route path="/produtos/add" element={<ProdutoAdd />} />
          <Route path="/admin/produtos/tax" element={<Taxa />} />
          <Route path="/admin/peliculas" element={<Peliculas />} /> 
        </Routes>
      </ProdutosProvider>
    </TaxasProvider>
    </UserProvider>
  </BrowserRouter>
);