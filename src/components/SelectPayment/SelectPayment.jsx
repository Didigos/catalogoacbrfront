import { useState } from "react";
import Select from "react-select";
import Modal from "../modal/Modal";

const tipoCartaoOptions = [
  { value: "debito", label: "Cartão de Débito" },
  { value: "credito", label: "Cartão de Crédito" },
];

function SelectPayment() {
  const [tipo, setTipo] = useState(null);
  const [openModal, setOpenMOdal] = useState(false);

  const changeModal = () => {
    console.log('teste')
    if (openModal) {
      console.log("fechou o modal");
      setOpenMOdal(false);
      return;
    }
    console.log("abriu o modal");
    setOpenMOdal(true);
  };

  const customStyles = {
    control: (provided) => ({
      //aqui você configura o estilo do select
      ...provided,
      height: "20px", // altura
      fontSize: ".9rem", // tamanho da fonte
      width: "160px", // largura
    }),
    valueContainer: (provided) => ({
      //aqui você configura o estilo do container que envolve o valor selecionado
      ...provided,
      height: "20px",
      padding: "0 12px",
    }),
    input: (provided) => ({
      //aqui você configura o estilo do input
      ...provided,
      margin: "0px",
    }),
  };

  return (
    <div>
      <Select
        styles={customStyles}
        options={tipoCartaoOptions}
        isSearchable={false}
        value={tipo}
        onChange={(selected) => {
          setTipo(selected);
          if (selected?.value === "credito") {
            changeModal();
          }
          if (selected?.value === "debito") {
            changeModal();
          }
        }}
        placeholder="Escolher"
      />
  {openModal && tipo?.value === "debito" && <Modal type="debito" onClose={() => setOpenMOdal(false)} />}
  {openModal && tipo?.value === "credito" && <Modal type="credito" onClose={() => setOpenMOdal(false)} />}
    </div>
  );
}

export default SelectPayment;
