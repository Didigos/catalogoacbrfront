import styles from "./Produtos.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useContext} from "react"
import ProdutosContext from "../../context/produtosContext"
import { useNavigate } from "react-router";
const Produtos = ()=>{
    const { produtos, loading } = useContext(ProdutosContext)
    const navigate = useNavigate();

    return(
        <main className={styles.produtos__main}>
            <header className={styles.produtos__header}>
                <div className={styles.produtos__header__icon}>
                    <FontAwesomeIcon icon={faPenToSquare} color="#ffffff" size="3x"/>
                </div>
                <h1 className={styles.produtos__header__title}>Edição de Produtos</h1>
            </header>
             <section className={styles.produtos__section}>
                {!loading && produtos.length > 0 ? produtos.map((produto)=>(
                <div key={produto.id} className={styles.produtos__item}>
                    <h1 className={styles.produtos__item__title}>{produto.nome}</h1>
                    <button onClick={() => navigate(`/produtos/${produto.id}`)} className={styles.produtos__item__text}>Clique Aqui para Editar</button>
               </div>
                )) : <section className={styles.no__item}>
                <h2 className={styles.no__item__title}>Nenhum produto encontrado</h2>
                <span className={styles.no__item__text}>Adicione produtos para que eles apareçam aqui</span>
               </section>}

            </section>

        </main>
    )
}

export default Produtos 