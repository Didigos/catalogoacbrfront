import styles from "./ProdutoAdd.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";

const ProdutoAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post(
        "https://catalogoacbr-production.up.railway.app/smartphones",
        {
          nome: data.nome,
          marca: data.marca,
          precobase: data.preco,
          precopix: data.precopix,
          detalhes: {
            Armazenamento: data.Armazenamento,
            bateria: data.bateria,
            camera: data.camera,
            memoria: data.memoria,
            processador: data.processador,
          },
          imagens: [data.imagens],
        }
      );
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
    alert("Produto adicionado com sucesso!");
    navigate("/produtos");
  };

  return (
    <main className={styles.main}>
      <header className={styles.edit__header}>
        <h1 className={styles.edit__title}>Adicionar Produto</h1>
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
            Modelo do aparelho
          </label>
          <input
            name="nome"
            type="text"
            placeholder={"Modelo do Aparelho"}
            {...register("nome", { required: true })}
          />
          {errors.nome && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="marca">
            Marca
          </label>
          <input
            name="marca"
            type="text"
            placeholder={"marca do aparelho"}
            {...register("marca", { required: true })}
          />
          {errors.marca && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
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
            placeholder={"Armazenamento do aparelho"}
            {...register("Armazenamento", { required: true })}
          />
          {errors.Armazenamento && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="bateria">
            Bateria
          </label>
          <input
            name="bateria"
            type="text"
            placeholder={"Bateria do aparelho"}
            {...register("bateria", { required: true })}
          />
          {errors.bateria && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="camera">
            Câmera
          </label>
          <input
            name="camera"
            type="text"
            placeholder={"Câmera do aparelho"}
            {...register("camera", { required: true })}
          />
          {errors.camera && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="memoria">
            Memória
          </label>
          <input
            name="memoria"
            type="text"
            placeholder={"Memória do aparelho"}
            {...register("memoria", { required: true })}
          />
          {errors.memoria && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="processador">
            Processador
          </label>
          <input
            name="processador"
            type="text"
            placeholder={"Processador do aparelho"}
            {...register("processador", { required: true })}
          />
          {errors.processador && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
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
            placeholder={"Link da imagem do aparelho"}
            {...register("imagens", { required: true })}
          />
          {errors.imagens && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>
        <hr className={styles.edit__divider} />
        <h2 className={styles.edit__title}>Tabela de preços</h2>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="precopix">
            Preço no Pix / dinheiro
          </label>
          <input
            name="precopix"
            type="text"
            placeholder={"Preço do aparelho no pix"}
            {...register("precopix", { required: true })}
          />
          {errors.precopix && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="precopix">
            Preço no Débito
          </label>
          <input
            name="precodebito"
            type="text"
            placeholder={"Preço do aparelho no débito"}
            {...register("precodebito", { required: true })}
          />
          {errors.precodebito && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        {/* VALORES PARA PARCELAMENTO */}
        <section>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="parcela1">
            Preço na Parcela 1x
          </label>
          <input
            name="parcela1"
            type="text"
            placeholder={"1x"}
            {...register("parcela1", { required: true })}
          />
          {errors.parcela1 && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="parcela2">
            Preço na Parcela 2x
          </label>
          <input
            name="parcela2"
            type="text"
            placeholder={"2x"}
            {...register("parcela2", { required: true })}
          />
          {errors.parcela2 && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="parcela3">
            Preço na Parcela 3x
          </label>
          <input
            name="parcela3"
            type="text"
            placeholder={"3x"}
            {...register("parcela3", { required: true })}
          />
          {errors.precodebito && (
            <span className={styles.form__error}>Este campo é obrigatório</span>
          )}
        </div>

        </section>

        <div className={styles.edit__buttons}>
          <button type="submit">Salvar</button>
          <button type="button">Excluir</button>
        </div>
      </form>
    </main>
  );
};

export default ProdutoAdd;
