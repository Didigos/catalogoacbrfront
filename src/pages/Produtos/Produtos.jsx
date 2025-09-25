import styles from "./Produtos.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faCircleExclamation, faRotateLeft, faHouse } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import ProdutosContext from "../../context/produtosContext";
import { useNavigate } from "react-router";
const Produtos = () => {
  const { produtos, loading, fetchProdutos } = useContext(ProdutosContext);
  const navigate = useNavigate();

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
          <FontAwesomeIcon icon={faPenToSquare} color="#ffffff" size="3x" />
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
            <h2 className={styles.no__item__title}>
              Nenhum produto encontrado
            </h2>
            <span className={styles.no__item__text}>
              Adicione produtos para que eles apareçam aqui
            </span>
          </section>
        )}
      </section>
    </main>
  );
};

export default Produtos;
