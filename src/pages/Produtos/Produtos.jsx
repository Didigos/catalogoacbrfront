import styles from "./Produtos.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleExclamation, faRotateLeft, faHouse, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import ProdutosContext from "../../context/produtosContext";
import { useNavigate } from "react-router";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const Produtos = () => {
  const { produtos, loading, fetchProdutos } = useContext(ProdutosContext);
  const navigate = useNavigate();

  const DeleteItem = (id) => {
    try {
      axios.delete(`https://catalogoacbr-production.up.railway.app/smartphones/${id}`)
      .then((response) => {
        if(response.status === 200){
          fetchProdutos();
        }
      });
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  }

  useEffect(()=>{
    fetchProdutos();
  }, []);

  return (
    <main className={styles.produtos__main}>
      <header className={styles.produtos__header}>
        <div className={styles.produtos__header__back__button}>
            <FontAwesomeIcon icon={faRotateLeft} style={{color: "#ffffff",}} onClick={() => window.history.back()} size="2x" />
            <span>Voltar</span>
        </div>
        <div className={styles.produtos__header__home__button}>
            <FontAwesomeIcon icon={faHouse} style={{color: "#ffffff",}} onClick={() => navigate("/")} size="2x" />
            <span>Home</span>
        </div>
        
        <div className={styles.produtos__header__icon}>
          <FontAwesomeIcon icon={faPenToSquare} color="#ffffff" size="2x" />
        </div>
        <h1 className={styles.produtos__header__title}>Edição de Produtos</h1>
      </header>
      <div className={styles.produtos__warning}>
        <FontAwesomeIcon className={styles.produtos__warning__icon} icon={faCircleExclamation} size="1x" color="#fff" />{" "}
        <span className={styles.produtos__warning__text}>
          Uma vez que o produto for deletado não há como recuperar.
        </span>
      </div>
      <section className={styles.produtos__section}>
        {!loading && produtos.length > 0 ? (
          produtos.map((produto) => (
            <div key={produto.id} className={styles.produtos__item}>
              <h1 className={styles.produtos__item__title}>{produto.nome}</h1>
              <FontAwesomeIcon icon={faTrash} style={{color: "#f1044b",}} size="2x" onClick={() => DeleteItem(produto.id)} />
              <button
                onClick={() => navigate(`/produtos/${produto.id}`)}
                className={styles.produtos__item__text}
              >
                Clique Aqui para Editar
              </button>
            </div>
          ))
        ) : (
          <section className={styles.no__item}>
            <ClipLoader color="#36d7b1" size={50} />
          </section>
        )}
        <div className={styles.produtos__addItem}>
          <button onClick={() => navigate("/produtos/add")}>+</button>
        </div>
      </section>
    </main>
  );
};

export default Produtos;
