import { useEffect, useState } from "react";
import styles from "./ProdutoForm.module.css";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const ProdutoForm = () => {const { id } = useParams();


const [getProdutos, setGetProdutos] = useState([]);
const defaultValues = {
  nome: ''
}
const {register,handleSubmit,formState: { errors },reset} = useForm({defaultValues});


  const onSubmit = async (data) => {
    try {
      await axios.put(
        `https://catalogoacbr-production.up.railway.app/smartphones/${id}`,
        {
          nome: data.nome,
          marca: data.marca,
          detalhes: {
            armazenamento: data.Armazenamento,
            bateria: data.bateria,
            camera: data.camera,
            memoria: data.memoria,
            processador: data.processador,
          },
          preco: {
            avista: data.precopix,
            debito: data.precodebito,
            credito: {
              parcela1: data.parcela1,
              parcela2: data.parcela2,
              parcela3: data.parcela3,
              parcela4: data.parcela4,
              parcela5: data.parcela5,
              parcela6: data.parcela6,
              parcela7: data.parcela7,
              parcela8: data.parcela8,
              parcela9: data.parcela9,
              parcela10: data.parcela10,
            },
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
    if(getProdutos.length !== 0){
      reset({ 
        precopix: getProdutos.preco.avista,
        precodebito: getProdutos.preco.debito,
        parcela1: getProdutos.preco.credito.parcela1,
        parcela2: getProdutos.preco.credito.parcela2,
        parcela3: getProdutos.preco.credito.parcela3,
        parcela4: getProdutos.preco.credito.parcela4,
        parcela5: getProdutos.preco.credito.parcela5,
        parcela6: getProdutos.preco.credito.parcela6,
        parcela7: getProdutos.preco.credito.parcela7,
        parcela8: getProdutos.preco.credito.parcela8,
        parcela9: getProdutos.preco.credito.parcela9,
        parcela10: getProdutos.preco.credito.parcela10,
        imagens: getProdutos.imagens[0],
        nome: getProdutos.nome,
        marca: getProdutos.marca,
        Armazenamento: getProdutos.detalhes.armazenamento,
        bateria: getProdutos.detalhes.bateria,
        camera: getProdutos.detalhes.camera,
        memoria: getProdutos.detalhes.memoria,
        processador: getProdutos.detalhes.processador,
      });
    }
  }, [getProdutos, reset]);
 
  useEffect(() => { 
    const getProduto = async () => {
      const response = await axios.get(
        `https://catalogoacbr-production.up.railway.app/smartphones/${id}`
      );
      setGetProdutos(response.data);
      reset({
        nome: response.data.nome
      })
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
            {...register("nome")}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="marca">
            Marca
          </label>
          <input
            name="marca"
            type="text"
            {...register("marca")}
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
            {...register("Armazenamento")}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="bateria">
            Bateria
          </label>
          <input
            name="bateria"
            type="text"
            {...register("bateria")}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="camera">
            Câmera
          </label>
          <input
            name="camera"
            type="text"
            {...register("camera")}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="memoria">
            Memória
          </label>
          <input
            name="memoria"
            type="text"
            {...register("memoria")}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.form__label} htmlFor="processador">
            Processador
          </label>
          <input
            name="processador"
            type="text"
            {...register("processador")}
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
            {...register("precopix")}
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
            {...register("precodebito")}
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
            {...register("parcela1")}
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
            {...register("parcela2")}
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
            {...register("parcela3")}
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
            {...register("parcela4")}
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
            {...register("parcela5")}
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
            {...register("parcela6")}
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
            {...register("parcela7")}
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
            {...register("parcela8")}
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
            {...register("parcela9")}
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
            {...register("parcela10")}
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
            {...register("imagens")}
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
