import styles from "./peliculas.module.css";
const Peliculas = () => {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <h1 className={styles.header__title}>Adaptação de Peliculas</h1>
                <span className={styles.header__user}>Olá, Amanda</span>
            </header>

            <div className={styles.informativo}>
                <h2 className={styles.informativo__title}>Informativo</h2>
                <span className={styles.informativo__text}>Esta é a página de informações sobre películas.</span>
            </div>

            <div className={styles.searchContainer}>
                <input className={styles.searchInput} type="search" name="search" id="search" placeholder="Digite o modelo da adaptação" />
            </div>


            <ul className={styles.adaptacoes__list}>
                <li className={styles.adaptacoes__item}>
                    <div className={styles.list__header}>
                        <div className={styles.modeloName}>
                            <span className={styles.modeloName__text}>Modelo X</span>
                        </div>
                        <div className={styles.marca}>Samsung</div>
                    </div>
                    <div className={styles.adaptacoes}>
                        <ul className={styles.modelo__list}>
                            <li className={styles.adaptacao__item}> <span>poco x7 pro</span></li>
                            <li className={styles.adaptacao__item}> <span>poco x7 pro</span></li>
                            <li className={styles.adaptacao__item}> <span>poco x7 pro</span></li>
                            <li className={styles.adaptacao__item}> <span>poco x7 pro</span></li>
                            <li className={styles.adaptacao__item}> <span>poco x7 pro</span></li>
                            <li className={styles.adaptacao__item}> <span>poco x7 pro</span></li>
                        </ul>
                    </div>

                </li>
            </ul>

        </main>
    )
}

export default Peliculas