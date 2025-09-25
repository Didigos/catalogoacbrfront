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

     const fetchProdutos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/smartphones");
      setProdutos(response.data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <ProdutosContext.Provider value={{ produtos, setProdutos, loading, fetchProdutos }}>
      {children}
    </ProdutosContext.Provider>
  );
}
