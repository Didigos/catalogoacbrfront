
import styles from "./Login.module.css";
import { useForm } from "react-hook-form";


const Login = () => {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("example"));
  return (
    <main className={styles.login__main}>
        <span className={styles.login__return} onClick={() => window.history.back()}>Voltar</span>
      <form className={styles.login__container} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.login__title}>Login de Usuario</h1>
        <input className={styles.login__input} {...register("example")} />
        <div className={styles.login__label}>Nome de usuario</div>
        <input className={styles.login__input} {...register("exampleRequired", { required: true })} />
        <div className={styles.password__label}>Senha</div>
        {errors.exampleRequired && <span className={styles.login__error}>Login ou senha incorretos</span>}
        <input className={styles.login__submit} type="submit" />
      </form>
    </main>
  );
};

export default Login