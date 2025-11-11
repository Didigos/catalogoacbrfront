import styles from "./Servicos.module.css";
import { useForm } from "react-hook-form";
const Servicos = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
  return (
    <main className={styles.servicos__main}>
      <header className={styles.servicos__header}>
        <h1 className={styles.header__titulo}>Lista de OS</h1>
      </header>

      <div className={styles.seach__container}>
        <input placeholder="Pesquise pelo nome do cliente" className={styles.search__input} type="search" name="" id="" />
      </div>

      <ul className={styles.list__section}>
        <li className={styles.list__item}>
          <div className={styles.list__item__title}>
            <span>Diego Pires Gomes</span>
          </div>
            <div className={styles.list__item__container}>
                <div className={styles.date__join}>
                    <h1>ENTRADA</h1>
                    <span>11/10/2025</span>
                </div>
                <div className={styles.date__left}>
                    <h1>SAÍDA</h1>
                    <span>12/10/2025</span>
                </div>
                <div className={styles.actions} >
                    <div className={`${styles.action__edit} ${styles.action__btn}`}></div>
                    <div className={`${styles.action__delete} ${styles.action__btn}`}></div>
                    <div className={`${styles.action__print} ${styles.action__btn}`}></div>
                </div>
                <div className={styles.item__situations}>
                    <select 
                    className={styles.item__select}
                    {...register("situacao")}
                    >
                        <option value="pendente">Pendente</option>
                        <option value="em_andamento">Em Andamento</option>
                        <option value="concluido">Concluído</option>
                    </select>
                </div>
            </div>
        </li>
      </ul>
    </main>
  );
};

export default Servicos;
