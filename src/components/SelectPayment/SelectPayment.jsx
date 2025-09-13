import React, { useState } from "react";
import Select from "react-select";

const tipoCartaoOptions = [
  { value: "debito", label: "Cartão de Débito" },
  { value: "credito", label: "Cartão de Crédito" }
];

const parcelas = Array.from({ length: 10 }, (_, i) => ({
  value: `${i + 1}x`,
  label: `${i + 1}x`
}));

function SelectPayment() {
  const [tipo, setTipo] = useState(null);

    const customStyles = {
      control: (provided) => ({
        ...provided,
        height: "45px",
        fontSize: ".9rem", // tamanho da fonte
        width: "160px", // largura
      }),
      valueContainer: (provided) => ({
        ...provided,
        height: "48px",
        padding: "0 12px",
      }),
      input: (provided) => ({
        ...provided,
        margin: "0px",
      }),
    };

  return (
    <div>
      <Select
        styles={customStyles}
        options={tipoCartaoOptions}
        value={tipo}
        onChange={setTipo}
        placeholder="Escolher"
      />
      {tipo?.value === "debito" && (
        {value: "debito", label: "R$ 2.399,90"}
      )}
      {tipo?.value === "credito" && (
        <>
        <Select options={parcelas} placeholder="Escolha o número de parcelas" />
        </>
      )}
    </div>
  );
}

export default SelectPayment;