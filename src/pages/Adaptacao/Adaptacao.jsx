import { useEffect, useState } from "react";
import styles from "./Adaptacao.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

const Adaptacao = () => {
  const [getModels, setModels] = useState([]);
  const [getActions, setActions] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [novaAdaptacao, setNovaAdaptacao] = useState("");
  const [idPelicula, setIdPelicula] = useState("");
  const [removeModel, setRemoveModel] = useState(false);
  const [opemModalNovaPelicula, setopemModalNovaPelicula] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // estado de pesquisa

  const {register, handleSubmit, reset, formState: {errors, isSubmitting}} = useForm({defaultValues: {nome: ""}})
    const filteredModels = getModels.filter((modelo) =>
    String(modelo?.modelo ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  
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
        if (openModal) {
        setOpenModal(false);
        reset(); // limpa o formulário ao fechar
        } else {
        setOpenModal(true);
        setIdPelicula(idPelicula);
        setNovaAdaptacao("");
        reset({ nome: "" }); // inicia vazio ao abrir
        }
    };

    const alterarModalNovaPelicula = ()=>{
        if (opemModalNovaPelicula) {
        setopemModalNovaPelicula(false);
        reset(); // limpa o formulário ao fechar
        } else {
        setopemModalNovaPelicula(true);
        setIdPelicula(idPelicula);
        setNovaAdaptacao("");
        reset({ nome: "" }); // inicia vazio ao abrir
        }

    }

    const enviarNovaPelicula = async () => {
    try {
        const nome = novaAdaptacao.trim();
        if (!idPelicula || !nome) return;

        const { data } = await axios.post(`https://catalogoacbr-production.up.railway.app/adaptacoes/${idPelicula}`,
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


    const handleDelete = async (ModeloMae, itemId) => {
        try {
        await axios.delete(
            `https://catalogoacbr-production.up.railway.app/adaptacoes/${ModeloMae}/itens/${itemId}`
        );
        } catch (err) {
        console.log(err);
        } finally {
        setModels((prevModels) =>
            prevModels.map((modelo) =>
            modelo.id === ModeloMae
                ? {
                    ...modelo,
                    adaptacoes: modelo.adaptacoes.filter(
                    (adaptacao) => adaptacao.id !== itemId
                    ),
                }
                : modelo
            )
        );
        setActions(false);
        }
    };


    const deleteModel = ()=>{
        if(removeModel) {
            setRemoveModel(false)
        }else{
            setRemoveModel(true)
        }
    }

    const removePelicula = async (modeloId) => {
        if (!modeloId) return;
        try {
        await axios.delete(`${API}/adaptacoes/${modeloId}`);
        // remove o modelo do estado local
        setModels((prevModels) => prevModels.filter((modelo) => modelo.id !== modeloId));
        } catch (err) {
        console.log(err);
        } finally {
        setRemoveModel(false);
        setActions(false);
        if (openModal) setOpenModal(false);
        }
    }

    const enviarPelicula = async (nomeInput) => {
        try {
            const modelo = String(nomeInput ?? "").trim();
            if (!modelo) return;

            const { data: novoModelo } = await axios.post(
            `${API}/adaptacoes`,
            { modelo } // backend aceita "modelo" (ou "nome")
            );

            setModels((prevModels) => [...prevModels, novoModelo]); // adiciona o novo modelo na lista

            reset();                      // limpa o form
            setopemModalNovaPelicula(false); // fecha o modal
        } catch (err) {
            console.log(err);
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

        <input
          className={styles.searchInput}
          type="search"
          name="search"
          id="search"
          placeholder="Pesquisar por modelo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      <ul className={styles.adaptacoes__list}>
        {filteredModels.map((model) => (
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
      <button onClick={() => removePelicula(model.id)} className={removeModel ? styles.delModel:  styles.delModelHidden}>
                <FontAwesomeIcon icon={faMinus} color="white" />
            </button>

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
            <button onClick={()=>deleteModel()} className={
                !removeModel ?
                `${styles.editCategory__remove} ${styles.editCategory__default}` :
                `${styles.cancelDelModel} ${styles.editCategory__default}`
                }>
                <span>
                    {!removeModel ? 'Remover Modelo' : 'Cancelar'}
                </span>
            </button>
            <button onClick={()=>alterarModalNovaPelicula()} className={`${styles.editCategory__add} ${styles.editCategory__default}`}>
                <span>
                    Adicionar Modelo
                </span>
            </button>

        </div>

        <div className={opemModalNovaPelicula ? styles.novaPelicula : styles.close__modal}>
            <form className={styles.novaPelicula__formulario} onSubmit={handleSubmit(({ nome }) => enviarPelicula(nome))}>
                <label htmlFor="addItem">Adicione o nome da Película</label>
                <input
                    type="text"
                    id="addItem"
                    placeholder="Ex.: Poco X7"
                    {...register("nome", {
                    required: "Campo Obrigatório",
                    minLength: { value: 2, message: "Mínimo de 2 caracteres" }
                    })}
                />
                {errors.nome && <small style={{ color: "crimson" }}>{errors.nome.message}</small>}
                <div className={styles.addItem__btn}>
                    <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Salvando..." : "Salvar"}
                </button>
                    <button type="button" onClick={() => alterarModalNovaPelicula()}>Cancelar</button>
                </div>
            </form>
        </div>
    </main>
  );
};

export default Adaptacao;
