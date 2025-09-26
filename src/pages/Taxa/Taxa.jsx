import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTrendUp,  faRotateLeft, faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from './Taxa.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const Taxa = () =>{ 
    const navigate = useNavigate();
    const {register, handleSubmit, watch, formState: { errors }, getValues} = useForm();
    const debitoSimulacaoValue = watch("debitoSimulacao");
    const creditoSimulacaoValor = watch("simulacaoCredito");
    const debitoTax = watch("debito");
    const credito1x = watch("credito1x");
    const credito2x = watch("credito2x");
    const credito3x = watch("credito3x");
    const credito4x = watch("credito4x");
    const credito5x = watch("credito5x");
    const credito6x = watch("credito6x");
    const credito7x = watch("credito7x");
    const credito8x = watch("credito8x");
    const credito9x = watch("credito9x");
    const credito10x = watch("credito10x");
    const credito11x = watch("credito11x");
    const credito12x = watch("credito12x");
    const onSubmit = (data)=>{
           console.log('formulario enviado: ',data);
    }

    const debitotaxa = (valor, debitTax) => {
        const taxa = valor + (valor * debitTax / 100);
        return taxa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    
    return(
        <main className={styles.main}>
            <header className={styles.header}>
                <FontAwesomeIcon className={styles.header__backIcon} icon={faRotateLeft} style={{color: "#ffffff",}} onClick={() => window.history.back()} size='2x' />
                <FontAwesomeIcon className={styles.header__backHouse} icon={faHouse} style={{color: "#ffffff",}} onClick={() => navigate('/')} size='2x' />
                <FontAwesomeIcon icon={faMoneyBillTrendUp} style={{color: "#ffffff",}} size='2x' />
                <h1>Painel de taxas</h1>
            </header>
            <div className={styles.tax__description}>
                <p>Aqui você pode configurar as taxas aplicadas para cada método de pagamento. Ajuste as porcentagens conforme necessário para refletir os custos associados a cada opção de pagamento.</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup}>
                    <h1>Cartão de Débito</h1>
                    <p>O valor da taxa será interpretado em Porcentagem sendo 0.5 igual a 0.5%</p>

                    <label className={styles.form__label} htmlFor="debito">Valor da Taxa</label>
                    <input 
                    type="text" 
                    id="debito" 
                    placeholder="Ex: 2.5"
                    {...register("debito", { required: true })} />
                    {errors.debito && <span>Este campo é obrigatório</span>}
                    
                        <div className={styles.inputGroup}>
                            <label className={styles.form__label__debitSimulator} htmlFor="debitoSimulacao">Valor para Simular</label>
                            <input 
                            className={styles.input__debitSimulator}
                            name='debitoSimulacao'
                            type="number" 
                            {...register("debitoSimulacao")}
                            />
                            <span className={styles.taxa__debito}>
                            Valor com taxa: {debitotaxa(parseFloat(debitoSimulacaoValue || 0), debitoTax)}
                            </span>                       
                        </div>
                </div>
                <hr />
                <div className={styles.inputGroup}>
                    <h1>Cartão de Crédito</h1>
                    <div className={styles.tax__simulator__credit__container}>
                        <label className={styles.tax__simulator__credit__text} htmlFor="simulacaoCredito">Digite o valor</label>
                        <input 
                        className={styles.tax__simulator__credit__input}
                        type="number" 
                        name={"simulacaoCredito"}
                        {...register("simulacaoCredito")}
                        />
                    </div>
                        <p>Digite o valor para uma simulação com as taxas abaixo.</p>
                        <h2 className={styles.credit__title}>Taxas para cada parcelamento</h2>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito1x">1x</label>
                            <input 
                            type="text" 
                            id="credito1x" 
                            placeholder="Ex: 1.5"
                            {...register("credito1x", { required: true })} />
                            {creditoSimulacaoValor && <span className={styles.credit__simulator__text} >
                                {(parseFloat(creditoSimulacaoValor || 0)* (1 + parseFloat(credito1x || 0) / 100)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>}
                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito2x">2x</label>
                            <input 
                            type="text" 
                            id="credito2x" 
                            placeholder="Ex: 2.5"
                            {...register("credito2x", { required: true })} />
                            {creditoSimulacaoValor && <span className={styles.credit__simulator__text} >
                                {(parseFloat(creditoSimulacaoValor || 0)* (1 + parseFloat(credito2x || 0) / 100)/2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito3x">3x</label>
                            <input 
                            type="text" 
                            id="credito3x" 
                            placeholder="Ex: 3.5"
                            {...register("credito3x", { required: true })} />
                                {creditoSimulacaoValor && <span className={styles.credit__simulator__text} >
                                    {(parseFloat(creditoSimulacaoValor || 0)* (1 + parseFloat(credito3x || 0) / 100)/3).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito4x">4x</label>
                            <input 
                            type="text" 
                            id="credito4x" 
                            placeholder="Ex: 4.5"
                            {...register("credito4x", { required: true })} />
                                {creditoSimulacaoValor && <span className={styles.credit__simulator__text} >
                                {(parseFloat(creditoSimulacaoValor || 0)* (1 + parseFloat(credito4x || 0) / 100)/4).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito5x">5x</label>
                            <input 
                            type="text" 
                            id="credito5x" 
                            placeholder="Ex: 5.5"
                            {...register("credito5x", { required: true })} />
                                {creditoSimulacaoValor && <span className={styles.credit__simulator__text} >
                                {(parseFloat(creditoSimulacaoValor || 0)* (1 + parseFloat(credito5x || 0) / 100)/5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito6x">6x</label>
                            <input 
                            type="text" 
                            id="credito6x" 
                            placeholder="Ex: 6.5"
                            {...register("credito6x", { required: true })} />
                            {creditoSimulacaoValor && <span className={styles.credit__simulator__text} >
                            {(parseFloat(creditoSimulacaoValor || 0)* (1 + parseFloat(credito6x || 0) / 100)/6).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito7x">7x</label>
                            <input 
                            type="text" 
                            id="credito7x" 
                            placeholder="Ex: 7.5"
                            {...register("credito7x", { required: true })} />
                                {creditoSimulacaoValor && <span className={styles.credit__simulator__text} >
                                {(parseFloat(creditoSimulacaoValor || 0)* (1 + parseFloat(credito7x || 0) / 100)/7).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito8x">8x</label>
                            <input 
                            type="text" 
                            id="credito8x" 
                            placeholder="Ex: 8.5"
                            {...register("credito8x", { required: true })} />
                                {creditoSimulacaoValor && <span className={styles.credit__simulator__text} >
                                {(parseFloat(creditoSimulacaoValor || 0)* (1 + parseFloat(credito8x || 0) / 100)/8).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito9x">9x</label>
                            <input 
                            type="text" 
                            id="credito9x" 
                            placeholder="Ex: 9.5"
                            {...register("credito9x", { required: true })} />
                                {creditoSimulacaoValor && <span className={styles.credit__simulator__text} >
                                {(parseFloat(creditoSimulacaoValor || 0)* (1 + parseFloat(credito9x || 0) / 100)/9).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito10x">10x</label>
                            <input 
                            type="text" 
                            id="credito10x" 
                            placeholder="Ex: 10.5"
                            {...register("credito10x", { required: true })} />
                                {creditoSimulacaoValor && <span className={styles.credit__simulator__text} >
                                {(parseFloat(creditoSimulacaoValor || 0)* (1 + parseFloat(credito10x || 0) / 100)/10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito11x">11x</label>
                            <input 
                            type="text" 
                            id="credito11x" 
                            placeholder="Ex: 11.5"
                            {...register("credito11x", { required: true })} />
                                {creditoSimulacaoValor && <span className={styles.credit__simulator__text} >
                                {(parseFloat(creditoSimulacaoValor || 0)* (1 + parseFloat(credito11x || 0) / 100)/11).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito12x">12x</label>
                            <input 
                            type="text" 
                            id="credito12x" 
                            placeholder="Ex: 12.5"
                            {...register("credito12x", { required: true })} />
                                {creditoSimulacaoValor && <span className={styles.credit__simulator__text} >
                                {(parseFloat(creditoSimulacaoValor || 0)* (1 + parseFloat(credito12x || 0) / 100)/12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>}

                        </div>
                    </div>
                    {errors.credito && <span>Este campo é obrigatório</span>}
                </div>

            </form>

        </main>
    )
}

export default Taxa
