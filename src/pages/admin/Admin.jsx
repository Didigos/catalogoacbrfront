import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./Admin.module.css"
import { faGear, faCircleExclamation, faUser, faBox, faHouse, faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
const Admin = () =>{
    const {user, loading} = useContext(UserContext);
    const navigate = useNavigate();

    if(loading){
        return <ClipLoader color="#36d7b1" size={50} />;
    }
    return (
        <main className={styles.admin__main}>
            <header className={styles.admin__header}>
        <div className={styles.admin__back}>
            <FontAwesomeIcon icon={faHouse} style={{color: "#ffffff",}} onClick={() => navigate("/")} size="2x" />
            <span>Home</span>
        </div>
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
            <section className={styles.admin__dev__warning}>
                <div className={styles.admin__warning__header}>
                    <div className={styles.admin__warning__icon}>
                        <FontAwesomeIcon icon={faCircleExclamation} size="1x" />
                    </div>
                    <h2 className={styles.admin__warning__title}>ULTIMAS ATUALIZAÇÕES</h2>
                </div>
                <div className={styles.admin__warning__text}>
                    <span>Aqui vão ficar informações sobre as últimas atualizações. e/ou avisos sobre o site</span>
                </div>
            </section>

            <section className={styles.admin__buttons}>
                <button onClick={() => alert("Deculpe, este botão está em manutenção. Obrigado pela paciência.")} style={{ backgroundColor: "#A6A2A2" }} className={styles.admin__button__item}><span><FontAwesomeIcon size="2x" color="#ffffff" icon={faUser} /></span>Usuários</button>
                <button onClick={() => navigate("/produtos")} style={{ backgroundColor: "#FFB042" }} className={styles.admin__button__item}><span><FontAwesomeIcon size="2x" color="#ffffff" icon={faBox} /></span>Produtos</button>
                <button onClick={() => navigate("/admin/peliculas")} style={{ backgroundColor: "#00a2ff" }} className={styles.admin__button__item}><span><FontAwesomeIcon size="2x" color="#ffffff" icon={faClipboardList} /></span>Peliculas</button>
                {/* <button onClick={() => navigate("/admin/produtos/tax")} style={{ backgroundColor: "#43B889" }} className={styles.admin__button__item}><span><FontAwesomeIcon size="2x" color="#ffffff" icon={faPercent} /></span>Taxas</button> */}
            </section>
        </main>
    )
}

export default Admin