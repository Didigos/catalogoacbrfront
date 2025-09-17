import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/login/Login.jsx";
import Admin from "./pages/admin/Admin.jsx";
import { ProdutosProvider } from "./context/produtosProvider.jsx";
import { TaxasProvider } from "./context/taxasProvider.jsx";
import { UserProvider } from "./context/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <UserProvider>
    <TaxasProvider>
      <ProdutosProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </ProdutosProvider>
    </TaxasProvider>
    </UserProvider>
  </BrowserRouter>
);