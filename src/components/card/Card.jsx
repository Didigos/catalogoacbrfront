import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrochip,
  faDatabase,
  faMemory,
  faBatteryFull,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import SelectPayment from "../SelectPayment/SelectPayment";
import { useEffect, useState } from "react";
import { useContext } from "react";
import TaxasContext from "../../context/taxasContext";


const Card = ({produtos}) => {
  const { taxas, setTaxas, loading } = useContext(TaxasContext);
  const [comTaxa, setComTaxa] = useState(0);

  const calcularPrecoComTaxa = (precoBase, taxa) => {
    const precoComTaxa =  (precoBase - (precoBase * taxa / 100).toFixed(2)) / 10;
    setComTaxa(precoComTaxa);
  }

  useEffect(() => {
   const precoComTaxa = calcularPrecoComTaxa(produtos.precobase, taxas[0].credito['10x'] || 0);
    console.log('preco com taxa: ', precoComTaxa)

  }, [produtos, taxas]);

  return (
    <main className={styles.main}>
      <section className={styles.product__section__info}>
        <div className={styles.product__image}>
          <img src="https://static.toiimg.com/thumb/resizemode-4,msid-117091955,imgsize-500,width-800/117091955.jpg" />
        </div>
        <div className={styles.product__datas}>
          <div className={styles.product__title}>
            <h1>{produtos.nome}</h1>
          </div>
          <div className={styles.product__specs}>
            <div className={styles.specification}>
              <div className={styles.specification__icon}>
                <FontAwesomeIcon icon={faMicrochip} size="2x" color="#FFB042" />
              </div>
              <div className={styles.specification__text}>
                <div className={styles.specification__text__title}>
                  Processador
                </div>
                <div className={styles.specification__text__desc}>
                  {produtos.detalhes.processador}
                </div>
              </div>
            </div>
            <div className={styles.specification}>
              <div className={styles.specification__icon}>
                <FontAwesomeIcon icon={faCamera} size="2x" color="#FFB042" />
              </div>
              <div className={styles.specification__text}>
                <div className={styles.specification__text__title}>Camera</div>
                <div className={styles.specification__text__desc}>{produtos.detalhes.camera}</div>
              </div>
            </div>
            <div className={styles.specification}>
              <div className={styles.specification__icon}>
                <FontAwesomeIcon
                  icon={faBatteryFull}
                  size="2x"
                  color="#FFB042"
                />
              </div>
              <div className={styles.specification__text}>
                <div className={styles.specification__text__title}>Bateria</div>
                <div className={styles.specification__text__desc}>{produtos.detalhes.bateria}</div>
              </div>
            </div>
            <div className={styles.specification}>
              <div className={styles.specification__icon}>
                <FontAwesomeIcon icon={faDatabase} size="2x" color="#FFB042" />
              </div>
              <div className={styles.specification__text}>
                <div className={styles.specification__text__title}>
                  Armazenamento
                </div>
                <div className={styles.specification__text__desc}>{produtos.detalhes.armazenamento}</div>
              </div>
            </div>
            <div className={styles.specification}>
              <div className={styles.specification__icon}>
                <FontAwesomeIcon icon={faMemory} size="2x" color="#FFB042" />
              </div>
              <div className={styles.specification__text}>
                <div className={styles.specification__text__title}>Memória</div>
                <div className={styles.specification__text__desc}>{produtos.detalhes.memoria}</div>
              </div>
            </div>
          </div>
          <div className={styles.product__payment}>
            <div className={styles.product__payment__title__container}>
              <span className={styles.product__payment__title}>
                Forma de Pagamento
              </span>
            </div>
              <SelectPayment />
          </div>
        </div>
      </section>
      <div className={styles.price__container}>
        <p
          className={styles.price__text}
          style={{ fontSize: ".9rem", fontWeight: "bold", color: "#666" }}
        >
          {produtos.precobase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} em até 10x de {comTaxa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} ou <br />
          <span
            style={{ fontSize: "1.4rem", color: "#46C262", fontWeight: "bold" }}
          >
            {produtos.precopix.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <span
            style={{ fontSize: ".7rem", color: "#46C262", fontWeight: "bold" }}
          >
            
            <br />
            No Pix / dinheiro
          </span>
        </p>
      </div>
    </main>
  );
};

export default Card;
