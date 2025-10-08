import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTrendUp,  faRotateLeft, faHouse } from '@fortawesome/free-solid-svg-icons';
import styles from './Taxa.module.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import taxasContext from '../../context/taxasContext';

const Taxa = () =>{ 
    const navigate = useNavigate();  
    const {taxas, loading} = useContext(taxasContext);
    // Estado local para armazenar valores das taxas após carregamento do contexto
    const [taxValues, setTaxValues] = useState({
        debito: '',
        credito1x: '',
        credito2x: '',
        credito3x: '',
        credito4x: '',
        credito5x: '',
        credito6x: '',
        credito7x: '',
        credito8x: '',
        credito9x: '',
        credito10x: '',
        credito11x: '',
        credito12x: '',
        debitoSimulacao: '',
        simulacaoCredito: ''
    });

    const {register, handleSubmit, watch, formState: { errors }, reset} = useForm({
        defaultValues: taxValues
    });

    const debitoSimulacaoValue = watch("debitoSimulacao");
    const creditoSimulacaoValor = watch("simulacaoCredito");

        const debitoTax = watch("debito");
        const credito1x = watch("credito1x");
        const TAXA_INTERMEDIACAO = 2.01;              // <-- ADICIONADO
        const TAXA_PARCELA_ADICIONAL = 2.66;         // <-- ADICIONADO


    const onSubmit = (data)=>{
           console.log('formulario enviado: ',data);
    }

const calcCreditoInfo = (valorBase, n) => {
    const v = parseFloat(valorBase);
    if (!v || !n) return null;

    const r = TAXA_PARCELA_ADICIONAL / 100;
    const interPercent = n === 1 ? parseFloat(credito1x || 0) : TAXA_INTERMEDIACAO;
    const inter = interPercent / 100;

    const round2 = num => Math.round((num + Number.EPSILON) * 100) / 100;

    if (n === 1) {
        // v = G * (1 - inter)  =>  G = v / (1 - inter)
        const G = v / (1 - inter);
        const parcela = round2(G); // 1x a parcela é o total
        return {
            parcela,
            total: parcela,
            parcelaFmt: parcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}),
            totalFmt: parcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})
        };
    }

    // Soma dos fatores de desconto (geometria)
    const S = Array.from({ length: n }, (_, k) => 1 / Math.pow(1 + r, k + 1))
        .reduce((a,b)=>a+b,0);
    const A = S / n;

    // v = G * (1 - inter) * A  =>  G = v / ((1 - inter) * A)
    const G = v / ((1 - inter) * A);

    // Parcela exibida: arredonda e depois recalcula total como parcela * n (imitando o app)
    const parcelaRaw = G / n;
    const parcela = round2(parcelaRaw);
    const total = round2(parcela * n);

    return {
        parcela,
        total,
        parcelaFmt: parcela.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}),
        totalFmt: total.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})
    };
};

    const debitotaxa = (valor, debitTax) => {
        const taxa = valor + (valor * debitTax / 100);
        return taxa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }


    // Quando taxas carregar (e não estiver em loading), atualiza estado e form
    useEffect(()=>{
        if(!loading && taxas && taxas.length > 0){
            const t = taxas[0];
            const newValues = {
                debito: t.debito || '',
                credito1x: t.credito?.['1x'] || '',
                credito2x: t.credito?.['2x'] || '',
                credito3x: t.credito?.['3x'] || '',
                credito4x: t.credito?.['4x'] || '',
                credito5x: t.credito?.['5x'] || '',
                credito6x: t.credito?.['6x'] || '',
                credito7x: t.credito?.['7x'] || '',
                credito8x: t.credito?.['8x'] || '',
                credito9x: t.credito?.['9x'] || '',
                credito10x: t.credito?.['10x'] || '',
                credito11x: t.credito?.['11x'] || '',
                credito12x: t.credito?.['12x'] || '',
                debitoSimulacao: '',
                simulacaoCredito: '',
            };
            setTaxValues(newValues); // Mantém em estado se precisar reutilizar
            reset(newValues); // Atualiza valores do formulário
        }
    },[loading, taxas, reset]);

    if(loading){
        return (
            <main className={styles.main}>
                <header className={styles.header}>
                    <FontAwesomeIcon className={styles.header__backIcon} icon={faRotateLeft} style={{color: "#ffffff",}} onClick={() => window.history.back()} size='2x' />
                    <FontAwesomeIcon className={styles.header__backHouse} icon={faHouse} style={{color: "#ffffff",}} onClick={() => navigate('/')} size='2x' />
                    <FontAwesomeIcon icon={faMoneyBillTrendUp} style={{color: "#ffffff",}} size='2x' />
                    <h1>Painel de taxas</h1>
                </header>
                <p style={{color:'#fff', padding:'1rem'}}>Carregando taxas...</p>
            </main>
        );
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

                            {creditoSimulacaoValor && (() => {
                            const info = calcCreditoInfo(creditoSimulacaoValor, 1);
                            return info && (
                                <span className={styles.credit__simulator__text}>
                                {info.parcelaFmt}
                                <br /><small style={{color:'#c00'}}>{info.totalFmt}</small>
                                </span>
                            );
                            })()}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito2x">2x</label>
                            <input 
                            type="text" 
                            id="credito2x" 
                            placeholder="Ex: 2.5"
                            {...register("credito2x", { required: true })} />

                        {creditoSimulacaoValor && (() => {
                            const info = calcCreditoInfo(creditoSimulacaoValor, 2);
                            return info && (
                                <span className={styles.credit__simulator__text}>
                                {info.parcelaFmt}
                                <br /><small style={{color:'#c00'}}>{info.totalFmt}</small>
                                </span>
                            );
                        })()}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito3x">3x</label>
                            <input 
                            type="text" 
                            id="credito3x" 
                            placeholder="Ex: 3.5"
                            {...register("credito3x", { required: true })} />

                        {creditoSimulacaoValor && (() => {
                            const info = calcCreditoInfo(creditoSimulacaoValor, 3);
                            return info && (
                                <span className={styles.credit__simulator__text}>
                                {info.parcelaFmt}
                                <br /><small style={{color:'#c00'}}>{info.totalFmt}</small>
                                </span>
                            );
                        })()}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito4x">4x</label>
                            <input 
                            type="text" 
                            id="credito4x" 
                            placeholder="Ex: 4.5"
                            {...register("credito4x", { required: true })} />

                        {creditoSimulacaoValor && (() => {
                            const info = calcCreditoInfo(creditoSimulacaoValor, 4);
                            return info && (
                                <span className={styles.credit__simulator__text}>
                                {info.parcelaFmt}
                                <br /><small style={{color:'#c00'}}>{info.totalFmt}</small>
                                </span>
                            );
                        })()}


                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito5x">5x</label>
                            <input 
                            type="text" 
                            id="credito5x" 
                            placeholder="Ex: 5.5"
                            {...register("credito5x", { required: true })} />

                        {creditoSimulacaoValor && (() => {
                            const info = calcCreditoInfo(creditoSimulacaoValor, 5);
                            return info && (
                                <span className={styles.credit__simulator__text}>
                                {info.parcelaFmt}
                                <br /><small style={{color:'#c00'}}>{info.totalFmt}</small>
                                </span>
                            );
                        })()}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito6x">6x</label>
                            <input 
                            type="text" 
                            id="credito6x" 
                            placeholder="Ex: 6.5"
                            {...register("credito6x", { required: true })} />

                        {creditoSimulacaoValor && (() => {
                            const info = calcCreditoInfo(creditoSimulacaoValor, 6);
                            return info && (
                                <span className={styles.credit__simulator__text}>
                                {info.parcelaFmt}
                                <br /><small style={{color:'#c00'}}>{info.totalFmt}</small>
                                </span>
                            );
                        })()}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito7x">7x</label>
                            <input 
                            type="text" 
                            id="credito7x" 
                            placeholder="Ex: 7.5"
                            {...register("credito7x", { required: true })} />

                        {creditoSimulacaoValor && (() => {
                            const info = calcCreditoInfo(creditoSimulacaoValor, 7);
                            return info && (
                                <span className={styles.credit__simulator__text}>
                                {info.parcelaFmt}
                                <br /><small style={{color:'#c00'}}>{info.totalFmt}</small>
                                </span>
                            );
                        })()}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito8x">8x</label>
                            <input 
                            type="text" 
                            id="credito8x" 
                            placeholder="Ex: 8.5"
                            {...register("credito8x", { required: true })} />

                        {creditoSimulacaoValor && (() => {
                            const info = calcCreditoInfo(creditoSimulacaoValor, 8);
                            return info && (
                                <span className={styles.credit__simulator__text}>
                                {info.parcelaFmt}
                                <br /><small style={{color:'#c00'}}>{info.totalFmt}</small>
                                </span>
                            );
                        })()}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito9x">9x</label>
                            <input 
                            type="text" 
                            id="credito9x" 
                            placeholder="Ex: 9.5"
                            {...register("credito9x", { required: true })} />

                        {creditoSimulacaoValor && (() => {
                            const info = calcCreditoInfo(creditoSimulacaoValor, 9);
                            return info && (
                                <span className={styles.credit__simulator__text}>
                                {info.parcelaFmt}
                                <br /><small style={{color:'#c00'}}>{info.totalFmt}</small>
                                </span>
                            );
                        })()}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito10x">10x</label>
                            <input 
                            type="text" 
                            id="credito10x" 
                            placeholder="Ex: 10.5"
                            {...register("credito10x", { required: true })} />

                                {creditoSimulacaoValor && (() => {
                                    const info = calcCreditoInfo(creditoSimulacaoValor, 10);
                                    return info && (
                                        <span className={styles.credit__simulator__text}>
                                            {info.parcelaFmt}
                                            <br /><small style={{color:'#c00'}}>{info.totalFmt}</small>
                                        </span>
                                    );
                                })()}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito11x">11x</label>
                            <input 
                            type="text" 
                            id="credito11x" 
                            placeholder="Ex: 11.5"
                            {...register("credito11x", { required: true })} />

                                {creditoSimulacaoValor && (() => {
                                    const info = calcCreditoInfo(creditoSimulacaoValor, 11);
                                    return info && (
                                        <span className={styles.credit__simulator__text}>
                                            {info.parcelaFmt}
                                            <br /><small style={{color:'#c00'}}>{info.totalFmt}</small>
                                        </span>
                                    );
                                })()}

                        </div>
                        <div className={styles.inputBox}>
                            <label className={styles.creditFormLabel} htmlFor="credito12x">12x</label>
                            <input 
                            type="text" 
                            id="credito12x" 
                            placeholder="Ex: 12.5"
                            {...register("credito12x", { required: true })} />

                                {creditoSimulacaoValor && (() => {
                                    const info = calcCreditoInfo(creditoSimulacaoValor, 12);
                                    return info && (
                                        <span className={styles.credit__simulator__text}>
                                            {info.parcelaFmt}
                                            <br /><small style={{color:'#c00'}}>{info.totalFmt}</small>
                                        </span>
                                    );
                                })()}

                        </div>
                    </div>
                    {errors.credito && <span>Este campo é obrigatório</span>}
                </div>

            </form>

        </main>
    )
}

export default Taxa
