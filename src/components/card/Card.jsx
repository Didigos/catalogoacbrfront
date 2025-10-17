import styles from "./Card.module.css";
import defafultImage from "../../assets/img_default.webp";
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
import { ClipLoader } from "react-spinners";

const Card = ({produtos}) => {

  // Estado para controlar a imagem exibida (fallback se quebrar)
  const [imageSrc, setImageSrc] = useState(() => (produtos?.imagens?.[0] || defafultImage));

  // Atualiza quando o produto muda
  useEffect(() => {

    setImageSrc(produtos?.imagens?.[0] || defafultImage);
  }, [produtos]);


 if (!produtos) {
    return <ClipLoader color="#36d7b1" size={50} />;
  }


  return (
    <main className={styles.main}>
      <section className={styles.product__section__info}>
        <div className={styles.product__image}>
          <img 
            src={imageSrc} 
            alt={produtos.nome}
            loading="lazy"
            onError={(e) => {
              // Evita loop caso a default também falhe
              e.currentTarget.onerror = null;
              setImageSrc(defafultImage);
            }}
          />
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
              <SelectPayment 
              precobase={produtos.precobase}
              parcelas={produtos.preco}
              productName={produtos.nome}
              memory={produtos.detalhes.memoria}
              />
          </div>
        </div>
      </section>
      <div className={styles.price__container}>
        <p
          className={styles.price__text}
          style={{ fontSize: ".9rem", fontWeight: "bold", color: "#666" }}
        >
          {(produtos.preco.credito.parcela10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} ou <br />
          <span
            style={{ fontSize: "1.4rem", color: "#46C262", fontWeight: "bold" }}
          >
            {produtos.preco.avista.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
