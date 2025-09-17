import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Admin.module.css"
import { faGear } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const Admin = () =>{
    const {user, loading} = useContext(UserContext);
 
    if(loading){
        return <div>Carregando...</div>
    }
    return (
        <main className={styles.admin__main}>
            <header className={styles.admin__header}>
                <section className={styles.admin__header__container}>
                <div className={styles.admin__header__icon}>
                    <FontAwesomeIcon color="#ffffff" icon={faGear} size="2x"/>
                </div>
                <div className={styles.admin__header__title}>Painel de Admin</div>
                </section>
                <div className={styles.admin__header__user}>
                    <span>Olá, {user.nome}</span>
                </div>
            </header>
        </main>
    )
}

export default Admin