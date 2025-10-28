import styles from "./Clientes.module.css";
import { useContext, useEffect } from "react";
import ClienteContext from "../../context/clientesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";


const Clientes = () => {
  const { clientes, loading } = useContext(ClienteContext);

  useEffect(() => {});

  return (
    <main className={styles.clientes__main}>
      <section>
        <header className={styles.header__container}>
          <h2>Cadastro de Clientes</h2>
        </header>
      </section>

      <section className={styles.clientes__container}>
        <ul className={styles.clientes__lista}>
          <li className={styles.lista___item}>
            <div className={styles.item__info}>
                <span>Diego Pires Gomes</span>
                <div>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <span>{"(11) 98765-4321"}</span>
                </div>
            </div>
          </li>
          <li className={styles.lista___item}>
            <div className={styles.item__info}>
                <span>Diego Pires Gomes</span>
                <div>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <span>{"(11) 98765-4321"}</span>
                </div>
            </div>
          </li>
          <li className={styles.lista___item}>
            <div className={styles.item__info}>
                <span>Diego Pires Gomes</span>
                <div>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <span>{"(11) 98765-4321"}</span>
                </div>
            </div>
          </li>
          <li className={styles.lista___item}>
            <div className={styles.item__info}>
                <span>Diego Pires Gomes</span>
                <div>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <span>{"(11) 98765-4321"}</span>
                </div>
            </div>
          </li>
          <li className={styles.lista___item}>
            <div className={styles.item__info}>
                <span>Diego Pires Gomes</span>
                <div>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <span>{"(11) 98765-4321"}</span>
                </div>
            </div>
          </li>
          <li className={styles.lista___item}>
            <div className={styles.item__info}>
                <span>Diego Pires Gomes</span>
                <div>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <span>{"(11) 98765-4321"}</span>
                </div>
            </div>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Clientes;
