
import axios from "axios";
import { useEffect, useState } from "react"
import ClienteContext from "./clientesContext"

export function ClientesProvider ({ children }) {
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("https://catalogoacbr-production.up.railway.app/clientes")
      .then((res) => {
        setClientes(res.data)
        console.log('clientes: ', res.data)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

       const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://catalogoacbr-production.up.railway.app/clientes");
      setClientes(response.data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

    return (
    <ClienteContext.Provider value={{ clientes, setClientes, loading, fetchClientes }}>
      {children}
    </ClienteContext.Provider>
  );
}