import { useState, useEffect } from "react";
import TaxasContext from "./taxasContext";
import axios from "axios";

export function TaxasProvider({ children }) {
  const [taxas, setTaxas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/taxas")
      .then((res) => {
        setTaxas(res.data)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <TaxasContext.Provider value={{ taxas, setTaxas, loading }}>
      {children}
    </TaxasContext.Provider>
  );
}
