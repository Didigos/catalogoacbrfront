import { useEffect, useState } from "react";
import styles from "./Adaptacao.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const Adaptacao = () => {
  const [getModels, setModels] = useState([]);
  const [getActions, setActions] = useState(false);
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const getModels = async () => {
      try {
        const response = await axios.get(
          "https://catalogoacbr-production.up.railway.app/adaptacoes"
        );
        setModels(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getModels();
  }, []);

  const showDeleteItem = () => {
    if (!getActions) {
      setActions(true);
    } else {
        setActions(false)
    }
  };

  const handleDelete = async (modeloId, adaptacaoId) => {
    try {
      await axios.delete(
        `http://localhost:3000/adaptacoes/${modeloId}/itens/${adaptacaoId}`
      );
    } catch (err) {
      console.log(err);
    } finally {
      setModels((prevModels) =>
        prevModels.map((modelo) =>
          modelo.id === modeloId
            ? {
                ...modelo,
                adaptacoes: modelo.adaptacoes.filter(
                  (adaptacao) => adaptacao.id !== adaptacaoId
                ),
              }
            : modelo
        )
      );
      setActions(false);
    }
  };

const handleAdd = async () => {
    if(openModal){
        setOpenModal(false)
    }else {
        setOpenModal(true)
    }
};


return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.header__title}>Adaptação de Peliculas</h1>
        <span className={styles.header__user}>Olá, Amanda</span>
      </header>

      <div className={styles.informativo}>
        <h2 className={styles.informativo__title}>Informativo</h2>
        <span className={styles.informativo__text}>
          Esta é a página de informações sobre películas.
        </span>
      </div>

      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          type="search"
          name="search"
          id="search"
          placeholder="Digite o modelo da adaptação"
        />
      </div>

      <ul className={styles.adaptacoes__list}>
        {getModels.map((model) => (
          <li key={model.id} className={styles.adaptacoes__item}>
            <div className={styles.list__header}>
              <div className={styles.modeloName}>
                <span className={styles.modeloName__text}>Modelo X</span>
              </div>
              <div className={styles.actions}>
                <button onClick={()=> handleAdd()} className={`${styles.actions__edit} ${styles.actions__add}`}>
                  Adicionar
                </button>
                <button onClick={() => showDeleteItem()} className={!getActions ?  styles.actions__delete : styles.actions__cancelDelete}>
                 {!getActions ? 'Excluir' : 'cancelar'}
                </button>
              </div>
            </div>
            <div className={styles.adaptacoes}>
              <ul className={styles.modelo__list}>
                {model.adaptacoes.map((adaptacao) => (
                  <li key={adaptacao.id} className={ styles.adaptacao__item}>
                    <span>{adaptacao.nome}</span>
                    <button
                      onClick={() => handleDelete(model.id, adaptacao.id)}
                      className={getActions ? styles.delete : styles.delHiddel}
                    >
                      <FontAwesomeIcon icon={faMinus} color="white" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

      <div className={openModal ? styles.modal : styles.close__modal}>
        <label htmlFor="addItem">Adicione o nome da Película</label>
        <input type="text" name="addItem" id="addItem" />
        <div className={styles.addItem__btn}>
            <button type="submit">Salvar</button>
            <button onClick={()=> handleAdd()} >Cancelar</button>
        </div>
      </div>
    </main>
  );
};

export default Adaptacao;
