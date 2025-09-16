import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import {
  faMicrochip,
  faDatabase,
  faMemory,
  faBatteryFull,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import SelectPayment from "../SelectPayment/SelectPayment";

const Card = () => {
  return (
    <main className={styles.main}>
      <section className={styles.product__section__info}>
        <div className={styles.product__image}>
          <img src="https://static.toiimg.com/thumb/resizemode-4,msid-117091955,imgsize-500,width-800/117091955.jpg" />
        </div>
          <div className={styles.product__datas}>
            <div className={styles.product__title}>
              <h1>POCO X7 PRO</h1>
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
                    Snapdragon
                  </div>
                </div>
              </div>
              <div className={styles.specification}>
                <div className={styles.specification__icon}>
                  <FontAwesomeIcon icon={faCamera} size="2x" color="#FFB042" />
                </div>
                <div className={styles.specification__text}>
                  <div className={styles.specification__text__title}>Camera</div>
                  <div className={styles.specification__text__desc}>50Mp</div>
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
                  <div className={styles.specification__text__desc}>5110 mAh</div>
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
                  <div className={styles.specification__text__desc}>512 Gb</div>
                </div>
              </div>
              <div className={styles.specification}>
                <div className={styles.specification__icon}>
                  <FontAwesomeIcon icon={faMemory} size="2x" color="#FFB042" />
                </div>
                <div className={styles.specification__text}>
                  <div className={styles.specification__text__title}>Memória</div>
                  <div className={styles.specification__text__desc}>12 Gb</div>
                </div>
              </div>
            </div>
              <div className={styles.product__payment}>
                <div className={styles.product__payment__title__container}>
                  <span className={styles.product__payment__title}>
                    Forma de Pagamento
                  </span>
                  <SelectPayment />
                </div>
              </div>
            </div>
      </section>
      <div className={styles.price__container}>
        <p className={styles.price__text} style={{fontSize: ".9rem",fontWeight: "bold", color: "#666"}}>R$ 2.499,90 em até 10x de R$ 287,36 ou <br /> <span style={{fontSize: "1.4rem", color: "#46C262", fontWeight: "bold"}}>R$ 2.199,90 </span> <span style={{fontSize: ".7rem",color: "#46C262", fontWeight: "bold"}}> <br />No Pix / dinheiro</span></p>
      </div>
    </main>
  );
};

export default Card;
