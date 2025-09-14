import { useEffect, useState } from "react";
import styles from "./Modal.module.css";

const Modal = ({ type, onClose }) => {
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
  }, []);

  return modalType == "credito" ? (
    <main className={styles.main}>
      <section className={styles.modal__container}>
        <header className={styles.header__container}>
          <h1 className={styles.header__title}>Parcelamento no {title}</h1>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>
            Produto: POCO X7 PRO 512/12GB
          </p>
        </header>
        <hr className={styles.separate} />
        <section className={styles.taxas__container}>
          <div className={styles.taxas_item}>
            <p>1x R$2.249,99</p>
          </div>
          <div className={styles.taxas_item}>
            <p>2x R$1.317,46</p>
          </div>
          <div className={styles.taxas_item}>
            <p>3x R$887,66</p>
          </div>
          <div className={styles.taxas_item}>
            <p>4x R$672,91</p>
          </div>
          <div className={styles.taxas_item}>
            <p>5x R$544,07</p>
          </div>
          <div className={styles.taxas_item}>
            <p>6x R$458,18</p>
          </div>
          <div className={styles.taxas_item}>
            <p>7x R$397,75</p>
          </div>
          <div className={styles.taxas_item}>
            <p>8x R$351,72</p>
          </div>
          <div className={styles.taxas_item}>
            <p>9x R$315,94</p>
          </div>
          <div className={styles.taxas_item}>
            <p>10x R$287,36</p>
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
          <h1 className={styles.header__title}>Parcelamento no {title}</h1>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>
            Produto: POCO X7 PRO 512/12GB
          </p>
        </header>
        <hr className={styles.separate} />
        <section className={styles.taxas__container}>
          <div className={styles.taxas_item}>
            <p>1x R$2499,90</p>
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
