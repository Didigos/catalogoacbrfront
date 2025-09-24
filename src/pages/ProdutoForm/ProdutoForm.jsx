import { useEffect, useState } from "react";
import styles from "./ProdutoForm.module.css"
import { useParams } from "react-router"
import { get, useForm } from "react-hook-form";
import axios from "axios";



const ProdutoForm = ()=>{

    const { id } = useParams();
    const [getProdutos, setGetProdutos] = useState([]);
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            nome: getProdutos.nome || "default",
            marca: getProdutos.marca || "default",
            preco: getProdutos.precobase || "default",

        }
    });

    const onSubmit = (data)=>{
        console.log('dados do formuladior:', data )
    }

    useEffect(() => {
       const getProduto = async () => {
        const response = await axios.get(`http://localhost:3000/smartphones/${id}`);
        setGetProdutos(response.data);
       }
       getProduto();
    }, [id]);

    return (
        <main className={styles.main}>
            <h2>Editar produto</h2>
            <form className={styles.edit__form} onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.edit__name__label} htmlFor="nome">Nome</label>
                <input
                    name="nome"
                    type="text"
                    placeholder={getProdutos.nome || "none"}
                    {...register("nome", { required: true })}
                />
                <label className={styles.edit__marca__label} htmlFor="marca">Marca</label>
                <input
                    name="marca"
                    type="text"
                    placeholder={getProdutos.marca || "none"}
                    {...register("marca", { required: true })}
                />
                <label className={styles.edit__preco__label} htmlFor="preco">Preço</label>
                <input
                    name="preco"
                    type="text"
                    placeholder={getProdutos.precobase || "none"}
                    {...register("preco", { required: true })}
                />
                <button type="submit">Salvar</button>
            </form>
        </main>
    )
}

export default ProdutoForm