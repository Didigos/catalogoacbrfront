import styles from "./App.module.css"

function App() {

  return (
    <>
    <header className={styles.header}>
      <div className={styles.header__items}>
        <div className={`${styles.header__nav__item}`}></div>
        <div className={`${styles.header__title__item}`}></div>
        <div className={`${styles.header__logo__item}`}></div>
      </div>
      <div className={styles.searchbar}></div>
    </header>
    </>
  )
}

export default App
