
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";


const Login = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [loginStatus, setLoginStatus] = useState(false);


    const onSubmit = (data) => {
        axios.post('http://localhost:3000/login', {
            email: data.email,
            password:data.password})
            .then((response)=>{
                if(response.status === 200){
                    localStorage.setItem('user', JSON.stringify(response.data.dados));
                      window.location.href = '/Admin';
                }
            }).catch((error)=>{
                console.log('mensagem2: ', error.response.data.erro)
                setLoginStatus(true)
            })
    }
  return (
    <main className={styles.login__main}>
        <span className={styles.login__return} onClick={() => window.history.back()}>Voltar</span>
      <form className={styles.login__container} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.login__title}>Login de Usuario</h1>
        <input type="email" className={styles.login__input} {...register("email", { required: true })} />
        <div className={styles.login__label}>E-mail</div>
        <input type="password" className={styles.login__input} {...register("password", { required: true })} />
        <div className={styles.password__label}>Senha</div>
        {errors.exampleRequired && <span className={styles.login__error}>Campos Obrigatórios</span>}
        {loginStatus && <span className={styles.login__error}>Login ou senha incorretos</span>}
        <input className={styles.login__submit} type="submit" />
      </form>
    </main>
  );
};

export default Login