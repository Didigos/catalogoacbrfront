import { useEffect, useState } from "react";
import styles from "./ProdutoForm.module.css";
import { useParams } from "react-router";
import { get, useForm } from "react-hook-form";
import axios from "axios";

const ProdutoForm = () => {
  const { id } = useParams();
  const [getProdutos, setGetProdutos] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.put(`https://catalogoacbr-production.up.railway.app/smartphones/${id}`, {
        nome: data.nome,
        marca: data.marca,
        precobase: data.preco,
        detalhes: {
          armazenamento: data.Armazenamento,
          bateria: data.bateria,
          camera: data.camera,
          memoria: data.memoria,
          processador: data.processador,
        },
        imagens: [data.imagens],
      });
      alert("Produto atualizado com sucesso!");
      window.history.back();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar produto.");
    }
  };

  useEffect(() => {
    if (getProdutos && getProdutos.nome) {
      reset({
        nome: getProdutos.nome,
        marca: getProdutos.marca,
        preco: getProdutos.precobase,
        Armazenamento: getProdutos.detalhes.armazenamento,
        bateria: getProdutos.detalhes.bateria,
        camera: getProdutos.detalhes.camera,
        memoria: getProdutos.detalhes.memoria,
        processador: getProdutos.detalhes.processador,
        imagens: getProdutos.imagens[0],
      });
    }
  }, [getProdutos, reset]);

  useEffect(() => {
    const getProduto = async () => {
      const response = await axios.get(
        `https://catalogoacbr-production.up.railway.app/smartphones/${id}`
      );
      // console.log("response", response.data);
      setGetProdutos(response.data);
    };
    getProduto();
  }, [id]);

  if (getProdutos.length === 0) return <p>Carregando...</p>;

  return (
    <main className={styles.main}>
      <header className={styles.edit__header}>
        <h1 className={styles.edit__title}>Editar Produto</h1>
        <button
          onClick={() => window.history.back()}
          className={styles.edit__button}
        >
          Voltar
        </button>
      </header>
      <form className={styles.edit__form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.edit__title}>Informações Gerais</h2>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="nome">
            Nome
          </label>
          <input
            name="nome"
            type="text"
            placeholder={getProdutos.nome || "none"}
            {...register("nome", { required: true })}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="marca">
            Marca
          </label>
          <input
            name="marca"
            type="text"
            placeholder={getProdutos.marca || "none"}
            {...register("marca", { required: true })}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="preco">
            Preço
          </label>
          <input
            name="preco"
            type="text"
            placeholder={getProdutos.precobase || "none"}
            {...register("preco", { required: true })}
          />
        </div>

        <hr className={styles.edit__divider} />

        <h2 className={styles.edit__title}>Especificações Técnicas</h2>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="Armazenamento">
            Armazenamento
          </label>
          <input
            name="Armazenamento"
            type="text"
            placeholder={getProdutos.detalhes.armazenamento || "none"}
            {...register("Armazenamento", { required: true })}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="bateria">
            Bateria
          </label>
          <input
            name="bateria"
            type="text"
            placeholder={getProdutos.detalhes.bateria || "none"}
            {...register("bateria", { required: true })}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="camera">
            Câmera
          </label>
          <input
            name="camera"
            type="text"
            placeholder={getProdutos.detalhes.camera || "none"}
            {...register("camera", { required: true })}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="memoria">
            Memória
          </label>
          <input
            name="memoria"
            type="text"
            placeholder={getProdutos.detalhes.memoria || "none"}
            {...register("memoria", { required: true })}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="processador">
            Processador
          </label>
          <input
            name="processador"
            type="text"
            placeholder={getProdutos.detalhes.processador || "none"}
            {...register("processador", { required: true })}
          />
        </div>

        <hr className={styles.edit__divider} />

        <h2 className={styles.edit__title}>Informações do Catalogo</h2>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="imagens">
            Link da Imagem
          </label>
          <input
            name="imagens"
            type="text"
            placeholder={getProdutos.imagens[0] || "none"}
            {...register("imagens", { required: true })}
          />
        </div>
        <div className={styles.edit__buttons}>
          <button type="submit">Salvar</button>
          <button type="button">Excluir</button>
        </div>
      </form>
    </main>
  );
};

export default ProdutoForm;
