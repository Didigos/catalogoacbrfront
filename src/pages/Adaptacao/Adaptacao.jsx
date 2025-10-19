import { useEffect, useState } from "react";
import styles from "./Adaptacao.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus } from "@fortawesome/free-solid-svg-icons"


const Adaptacao = () => {
        const [getModels, setModels] = useState([]);

    useEffect(()=>{
         const getModels = async()=>{
            try{
                const response = await axios.get("https://catalogoacbr-production.up.railway.app/adaptacoes");
                setModels(response.data);
            }catch(err){
                console.log(err);
            }
        }
       getModels();
    },[])


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
                {getModels.map((model) => (
                    <li key={model.id} className={styles.adaptacoes__item}>
                        <div className={styles.list__header}>
                            <div className={styles.modeloName}>
                                <span className={styles.modeloName__text}>Modelo X</span>
                            </div>
                            <div className={styles.actions}>
                                <button className={`${styles.actions__edit} ${styles.actions__add}`}>Adicionar</button>
                                <button className={styles.actions__delete}>Excluir</button>
                            </div>
                        </div>
                        <div className={styles.adaptacoes}>
                            <ul className={styles.modelo__list}>
                                <li className={styles.adaptacao__item}>
                                     <span>poco x7 pro</span>
                                     <div className={styles.delete}>
                                        <FontAwesomeIcon icon={faMinus} color="white"/>
                                     </div>
                                </li>
                                <li className={styles.adaptacao__item}>
                                     <span>poco x7 pro</span>
                                     <div className={styles.delete}>
                                        <FontAwesomeIcon icon={faMinus} color="white"/>
                                     </div>
                                </li>
                                <li className={styles.adaptacao__item}>
                                     <span>poco x7 pro</span>
                                     <div className={styles.delete}>
                                        <FontAwesomeIcon icon={faMinus} color="white"/>
                                     </div>
                                </li>
                                <li className={styles.adaptacao__item}>
                                     <span>poco x7 pro</span>
                                     <div className={styles.delete}>
                                        <FontAwesomeIcon icon={faMinus} color="white"/>
                                     </div>
                                </li>
                                <li className={styles.adaptacao__item}>
                                     <span>poco x7 pro</span>
                                     <div className={styles.delete}>
                                        <FontAwesomeIcon icon={faMinus} color="white"/>
                                     </div>
                                </li>
                                <li className={styles.adaptacao__item}>
                                     <span>poco x7 pro</span>
                                     <div className={styles.delete}>
                                        <FontAwesomeIcon icon={faMinus} color="white"/>
                                     </div>
                                </li>
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>

        </main>
    )
}

export default Adaptacao