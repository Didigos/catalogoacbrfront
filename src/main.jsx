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
        </Routes>
      </ProdutosProvider>
    </TaxasProvider>
    </UserProvider>
  </BrowserRouter>
);