import { useEffect } from "react";
import styles from "./ProdutoForm.module.css"
import { useParams } from "react-router"
const ProdutoForm = ()=>{

    const { id } = useParams();

    useEffect(() => {
       console.log('id do produto: ', id)
    }, [id]);

    return (
        <main>
            <h1 className={styles.main__title}>Produto Form</h1>
        </main>
    )
}

export default ProdutoForm