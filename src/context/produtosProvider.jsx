import { useState, useEffect } from "react";
import ProdutosContext from "./produtosContext";
import axios from "axios";

export function ProdutosProvider({ children }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/smartphones")
      .then((res) => {
        setProdutos(res.data)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProdutosContext.Provider value={{ produtos, setProdutos, loading }}>
      {children}
    </ProdutosContext.Provider>
  );
}
