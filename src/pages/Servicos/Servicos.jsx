import styles from "./Servicos.module.css";
const Servicos = () => {
  return (
    <main className={styles.servicos__main}>
      <header className={styles.servicos__header}>
        <h1 className={styles.header__titulo}>Lista de OS</h1>
      </header>

      <div className={styles.seach__container}>
        <input placeholder="digite o nome do cliente" className={styles.search__input} type="search" name="" id="" />
      </div>

      <ul className={styles.list__section}>
        <li className={styles.list__item}>
          <div className={styles.list__item__title}>
            <span>OS N: 001</span>
          </div>
        </li>
      </ul>
    </main>
  );
};

export default Servicos;
