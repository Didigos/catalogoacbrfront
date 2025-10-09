import { useEffect, useState } from "react";
import styles from "./ProdutoForm.module.css";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ClipLoader } from "react-spinners";

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
      await axios.put(
        `https://catalogoacbr-production.up.railway.app/smartphones/${id}`,
        {
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
        }
      );
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

  if (getProdutos.length === 0)
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader color="#36d7b1" size={50} />
      </div>
    );

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
        <h2 className={styles.edit__title}>preços & parcelas</h2>

        {/* VALORES PARA PARCELAMENTO */}

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="precopix">
            Preço no Pix / dinheiro
          </label>
          <input
            name="precopix"
            type="text"
            placeholder={getProdutos.preco.avista || "Preço do aparelho no pix"}
            {...register("precopix", { required: true })}
          />
          {errors.precopix && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="precodebito">
            Preço no Débito
          </label>
          <input
            name="precodebito"
            type="text"
            placeholder={getProdutos.preco.debito || "Preço do aparelho no débito"}
            {...register("precodebito", { required: true })}
          />
          {errors.precodebito && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="parcela1">
            Preço da Parcela 1x
          </label>
          <input
            name="parcela1"
            type="text"
            placeholder={getProdutos.preco.credito.parcela1 || "sem dados"}
            {...register("parcela1", { required: true })}
          />
          {errors.parcela1 && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="parcela2">
            Preço da Parcela 2x
          </label>
          <input
            name="parcela2"
            type="text"
            placeholder={getProdutos.preco.credito.parcela2 || "sem dados"}
            {...register("parcela2", { required: true })}
          />
          {errors.parcela2 && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="parcela3">
            Preço da Parcela 3x
          </label>
          <input
            name="parcela3"
            type="text"
            placeholder={getProdutos.preco.credito.parcela3 || "sem dados"}
            {...register("parcela3", { required: true })}
          />
          {errors.parcela3 && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="parcela4">
            Preço da Parcela 4x
          </label>
          <input
            name="parcela4"
            type="text"
            placeholder={getProdutos.preco.credito.parcela4 || "sem dados"}
            {...register("parcela4", { required: true })}
          />
          {errors.parcela4 && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="parcela5">
            Preço da Parcela 5x
          </label>
          <input
            name="parcela5"
            type="text"
            placeholder={getProdutos.preco.credito.parcela5 || "sem dados"}
            {...register("parcela5", { required: true })}
          />
          {errors.parcela5 && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="parcela6">
            Preço da Parcela 6x
          </label>
          <input
            name="parcela6"
            type="text"
            placeholder={getProdutos.preco.credito.parcela6 || "sem dados"}
            {...register("parcela6", { required: true })}
          />
          {errors.parcela6 && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="parcela7">
            Preço da Parcela 7x
          </label>
          <input
            name="parcela7"
            type="text"
            placeholder={getProdutos.preco.credito.parcela7 || "sem dados"}
            {...register("parcela7", { required: true })}
          />
          {errors.parcela7 && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="parcela8">
            Preço da Parcela 8x
          </label>
          <input
            name="parcela8"
            type="text"
            placeholder={getProdutos.preco.credito.parcela8 || "sem dados"}
            {...register("parcela8", { required: true })}
          />
          {errors.parcela8 && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="parcela9">
            Preço da Parcela 9x
          </label>
          <input
            name="parcela9"
            type="text"
            placeholder={getProdutos.preco.credito.parcela9 || "sem dados"}
            {...register("parcela9", { required: true })}
          />
          {errors.parcela9 && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="parcela10">
            Preço da Parcela 10x
          </label>
          <input
            name="parcela10"
            type="text"
            placeholder={getProdutos.preco.credito.parcela10 || "sem dados"}
            {...register("parcela10", { required: true })}
          />
          {errors.parcela10 && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <hr className={styles.edit__divider} />

        <h2 className={styles.edit__title}>Imagem no Catalogo</h2>

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
