import { useContext, useEffect, useState } from "react";
import styles from "./Modal.module.css";
import TaxasContext from "../../context/taxasContext";
import ProdutosContext from "../../context/produtosContext";

const Modal = ({ type, onClose, preco, productName, memory }) => {
  const [title, setTitle] = useState("");
  const [modalType, setModalType] = useState("");
  const { taxas } = useContext(TaxasContext);

  const calcTax = (valor, parcela)=>{
    const taxaPercent = taxas[0].credito[valor]
    const valorTotal = preco + (preco * taxaPercent / 100);
    const valorParcela = valorTotal / parcela;
    return valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  useEffect(() => {

    if (type === "credito") {
      setTitle("Cartão de crédito");
      setModalType("credito");
    } else {
      setTitle("Cartão de débito");
      setModalType("debito");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preco, taxas]);

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
              <p>1x {calcTax('1x', 1)}</p>
            </div>
            <div className={styles.taxas_item}>
              <p>2x {calcTax('2x', 2)}</p>
            </div>
            <div className={styles.taxas_item}>
              <p>3x {calcTax('3x', 3)}</p>
            </div>
            <div className={styles.taxas_item}>
              <p>4x {calcTax('4x', 4)}</p>
            </div>
            <div className={styles.taxas_item}>
              <p>5x {calcTax('5x', 5)}</p>
            </div>
            <div className={styles.taxas_item}>
              <p>6x {calcTax('6x', 6)}</p>
            </div>
            <div className={styles.taxas_item}>
              <p>1x {calcTax('7x', 7)}</p>
            </div>
            <div className={styles.taxas_item}>
              <p>8x {calcTax('8x', 8)}</p>
            </div>
            <div className={styles.taxas_item}>
              <p>9x {calcTax('9x', 9)}</p>
            </div>
            <div className={styles.taxas_item}>
              <p>10x {calcTax('10x', 10)}</p>
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
            <p>{calcTax('1x', 1)}</p>
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
