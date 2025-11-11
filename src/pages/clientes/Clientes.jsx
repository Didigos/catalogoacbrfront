import styles from "./Clientes.module.css";
import { useContext, useState } from "react";
import ClienteContext from "../../context/clientesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRotateLeft, faPhone, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import {useForm} from "react-hook-form";
import axios from "axios";

const Clientes = () => {
  const { clientes, loading, fetchClientes } = useContext(ClienteContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar clientes baseado no termo de busca
  const filteredClientes = clientes.filter((cliente) =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.celular.includes(searchTerm)
  );

  const onSubmit = async(data) => {
    try{
      const response = await axios.post("https://catalogoacbr-production.up.railway.app/clientes", {
        nome: data.nome,
        celular: data.telefone
      });
      console.log(response.data);
      
      // Atualiza a lista automaticamente
      fetchClientes();
      
      // Limpa o formulário e fecha o modal
      reset();
      setOpenModal(false);
    } catch(error){
      console.error("Erro ao adicionar cliente:", error);
    }
  };

  const handleDelete = async(id) => {
    try {
      const response = await axios.delete(`https://catalogoacbr-production.up.railway.app/clientes/${id}`);
      console.log("Cliente deletado com sucesso:", response.data);
      
      // Atualiza a lista automaticamente
      fetchClientes();
    }catch(error){
      console.log("Erro ao deletar cliente:", error);
    }
  }

  const changeModal = () =>{
    setOpenModal(!openModal);
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <main className={styles.clientes__main}>
      <section>
        <header className={styles.header__container}>
          <h2>Cadastro de Clientes</h2>
          <div className={styles.return__btn__container}>
            <button className={styles.return__btn} onClick={()=>window.history.back()}>
              <FontAwesomeIcon color="white" size="2x" icon={faRotateLeft} />
            </button>
            <span>Voltar</span>
          </div>
        </header>
      </section>
      <div className={styles.search__container}>
        <input 
          type="text" 
          placeholder="Buscar cliente..." 
          className={styles.search__input}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <section className={styles.clientes__container}>
        <ul className={styles.clientes__lista}>
          {filteredClientes.map((cliente)=>{
            return(
              <li key={cliente.id} className={styles.lista___item}>
                <div className={styles.item__info}>
                    <div className={styles.items__informations}>
                        <h1 className={styles.item__nome}>{cliente.nome}</h1>
                        <div className={styles.item__phone}>
                          <FontAwesomeIcon color="green" icon={faPhone}></FontAwesomeIcon>
                          <span>{cliente.celular}</span>
                        </div>
                    </div>
                    <button className={styles.delete__icon} onClick={() => handleDelete(cliente.id)}>
                      <FontAwesomeIcon size="2x" color="red" icon={faTrash} />                    
                    </button>
                </div>
              </li> 
            )
          })}
        </ul>
      </section>
      <button onClick={changeModal} className={styles.add__cliente__btn}>
        <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff",}} />
      </button>

      <section className={openModal ? `${styles.adicionar__cliente__section} ${styles.cliente__teste}` : styles.adicionar__cliente__section__hidden}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.cliente__modal}>
            <input 
            className={styles.cliente__input}
              type="text" 
              placeholder="Nome do Cliente" 
              {...register("nome", { required: true })} 
            />
            {errors.nome && <span className={styles.error__message}>Nome é obrigatório</span>}
            <input 
            className={styles.cliente__input}
              type="text" 
              placeholder="telefone do Cliente" 
              {...register("telefone", { required: true })} 
            />
            {errors.telefone && <span className={styles.error__message}>Telefone é Obrigatório</span>}
            <div className={styles.cliente__modal__buttons}>
            <button onClick={changeModal} type="button" className={`${styles.cliente__btn} ${styles.cliente__btn__cancelar}`}>cancelar</button>
            <button type="submit" className={`${styles.cliente__btn} ${styles.cliente__btn__adicionar}`}>Adicionar Cliente</button>
            </div>
          
          </form>
      </section>
    </main>
  );
};

export default Clientes;
