import { useEffect, useState } from "react";
import styles from "./Adaptacao.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const Adaptacao = () => {
  const [getModels, setModels] = useState([]);
  const [getActions, setActions] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [novaAdaptacao, setNovaAdaptacao] = useState("")
  const [idPelicula, setIdPelicula] = useState("")
  
    const API = "https://catalogoacbr-production.up.railway.app"
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(`${API}/adaptacoes`);
        setModels(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchModels();
  }, []);

  const showDeleteItem = () => {
    if (!getActions) {
      setActions(true);
    } else {
        setActions(false)
    }
  };

    const alterarModal = (idPelicula) => {
        if(openModal) {
            setOpenModal(false)
        }else{
            setOpenModal(true)
            setIdPelicula(idPelicula)
            setNovaAdaptacao("")
        }
    }

const enviarNovaPelicula = async () => {
  try {
    const nome = novaAdaptacao.trim();
    if (!idPelicula || !nome) return;

    const { data } = await axios.post(`https://catalogoacbr-production.up.railway.app/${idPelicula}`,
      { nome }
    );

    // garante um id caso o backend não retorne
    const adaptacaoComId = data && data.id ? data : { id: String(Date.now()), nome };

    setModels((prevModels) =>
      prevModels.map((modelo) =>
        modelo.id === idPelicula
          ? { ...modelo, adaptacoes: [...modelo.adaptacoes, adaptacaoComId] }
          : modelo
      )
    );

    setNovaAdaptacao("");
    setOpenModal(false);
  } catch (err) {
    console.log(err);
  }
};  


  const handleDelete = async (modeloId, adaptacaoId) => {
    try {
      await axios.delete(
        `https://catalogoacbr-production.up.railway.app/${modeloId}/itens/${adaptacaoId}`
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
                <span className={styles.modeloName__text}>{model.modelo}</span>
              </div>
              <div className={styles.actions}>
                <button onClick={()=> alterarModal(model.id)} className={`${styles.actions__edit} ${styles.actions__add}`}>
                  Adicionar
                </button>
                <button onClick={() => showDeleteItem()} className={!getActions ?  styles.actions__delete : styles.actions__cancelDelete}>
                 {!getActions ? 'Excluir' : 'cancelar'}
                </button>
              </div>
            </div>
            <div className={styles.adaptacoes}>
              <ul className={styles.modelo__list}>
                {model.adaptacoes.map((adaptacao, idx) => (
                  <li
                    key={adaptacao?.id ?? `${model.id}-${(adaptacao?.nome ?? adaptacao)}-${idx}`}
                    className={ styles.adaptacao__item}
                  >
                    <span>{typeof adaptacao === 'string' ? adaptacao : adaptacao.nome}</span>
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
        <input 
            type="text" 
            name="addItem" 
            id="addItem" 
            value={novaAdaptacao ? novaAdaptacao : ""} 
            onChange={(event)=> setNovaAdaptacao(event.target.value)}
        />
        <div className={styles.addItem__btn}>
            <button onClick={enviarNovaPelicula} type="button">Salvar</button>
            <button onClick={()=> alterarModal()} >Cancelar</button>
        </div>
      </div>

        <div className={styles.editCategory__container}>
            <button className={`${styles.editCategory__remove} ${styles.editCategory__default}`}>
                <span>
                    Remove Modelo
                </span>
            </button>
            <button className={`${styles.editCategory__add} ${styles.editCategory__default}`}>
                <span>
                    Adicionar Modelo
                </span>
            </button>

        </div>

    </main>
  );
};

export default Adaptacao;
