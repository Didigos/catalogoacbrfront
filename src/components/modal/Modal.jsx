import { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import TaxasContext from "../../context/taxasContext";
import ProdutosContext from "../../context/produtosContext";

const Modal = ({ type, onClose, productName, memory, parcelas }) => {
  const [title, setTitle] = useState("");
  const [modalType, setModalType] = useState("");

  useEffect(() => {

    if (type === "credito") {
      setTitle("Cartão de crédito");
      setModalType("credito");
    } else {
      setTitle("Cartão de débito");
      setModalType("debito"); 
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parcelas]);

  return modalType == "credito" ? (
    <main className={styles.main}>
      <section className={styles.modal__container}>
        <header className={styles.header__container}>
          <h1 className={styles.header__title}>Parcelamento no {title}</h1>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>
            Produto: {productName} {memory}
          </p>
        </header>
        <hr className={styles.separate} />
        <section className={styles.taxas__container}>
          <div className={styles.taxas_item}>
            <p>1x {(parcelas.credito.parcela1).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p>
          </div>
          <div className={styles.taxas_item}>
            <p>2x {(parcelas.credito.parcela2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p>
          </div>
          <div className={styles.taxas_item}>
            <p>3x {(parcelas.credito.parcela3).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p>
          </div>
          <div className={styles.taxas_item}>
            <p>4x {(parcelas.credito.parcela4).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p>
          </div>
          <div className={styles.taxas_item}>
            <p>5x {(parcelas.credito.parcela5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p>
          </div>
          <div className={styles.taxas_item}>
            <p>6x {(parcelas.credito.parcela6).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p>
          </div>
          <div className={styles.taxas_item}>
            <p>7x {(parcelas.credito.parcela7).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p>
          </div>
          <div className={styles.taxas_item}>
            <p>8x {(parcelas.credito.parcela8).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p>
          </div>
          <div className={styles.taxas_item}>
            <p>9x {(parcelas.credito.parcela9).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p>
          </div>
          <div className={styles.taxas_item}>
            <p>10x {(parcelas.credito.parcela10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p>
          </div>
        </section>
        <hr className={styles.separate} />
        <button onClick={onClose} className={styles.btn__close}>
          fechar
        </button>
      </section>
    </main>
  ) : (
    <main className={styles.main}>
      <section className={styles.modal__container}>
        <header className={styles.header__container}>
          <h1 className={styles.header__title}>Pagamento no {title}</h1>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>
            Produto: {productName} {memory}
          </p>
        </header>
        <hr className={styles.separate} />
        <section className={styles.taxas__container}>
          <div className={styles.taxas_item}>
            <p>{(parcelas.debito).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          </div>
        </section>
        <hr className={styles.separate} />
        <button onClick={onClose} className={styles.btn__close}>
          fechar
        </button>
      </section>
    </main>
  );
};

export default Modal;
