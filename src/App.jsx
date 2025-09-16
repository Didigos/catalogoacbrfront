import styles from "./App.module.css";
import HamburgerMenu from "./components/menu/hamburguerMenu";
import logo from "./assets/logo.svg";
import Card from "./components/card/Card";

function App() {
  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.header__items}>
            <div className={`${styles.header__nav__item}`}>
              <HamburgerMenu />
            </div>
            <div className={`${styles.header__title__item}`}>
              <h1 className={styles.header__titulo}>CATALOGO</h1>
            </div>
            <div className={`${styles.header__logo__item}`}>
              <img src={logo} alt="Logo ACBR" className={styles.header__logo} />
            </div>
          </div>
          <div className={styles.searchbar}>
            <div className={styles.searchbar__container}>
              <span className={styles.searchbar__icon}>
                {/* Ícone SVG de lupa */}
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                </svg>
              </span>
              <input
                className={styles.searchbar__input}
                type="search"
                name="search"
                id="search"
                placeholder="Buscar no catalogo"
              />
            </div>
          </div>{" "}
        </header>
        <Card />
        <Card />
        <Card />
        {/* <section className={styles.products}>
          <Card />
          <Card />
        </section> */}
      </main>
    </>
  );
}

export default App;
