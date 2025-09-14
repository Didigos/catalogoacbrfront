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
      <section className={styles.price__container}>
        <div className={styles.price__maxCredit}>
          <p className={styles.price__maxCredit__p}>Em até 10x de:</p>
          <h1 className={styles.price__maxCredit__title}>R$2.499,90</h1>
          <p className={styles.price__maxCredit__p__sub}>no cartão de crédito</p>
        </div>
        <div className={styles.price__maxpix}>
          <p className={styles.price__pix__p}>A vista <br /> no pix ou dinheiro</p>
          <h1 className={styles.price__pix__title}>R$ 2.199,90</h1>
        </div>
      </section>
    </main>
  );
};

export default Card;
