import { FormEvent, useState } from "react";
import { useGlobalState } from "../context/GlobalState";

// componente para añadir una transacción desde un form
function TransactionForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  // traigo la función addTransaction del contexto
  const { addTransaction } = useGlobalState();

  const sendFormData = (e) => {
    e.preventDefault();
    // uso la función que traje del contexto para agregar transacciones
    addTransaction({
      // es una función que viene con el navegador y nos permite generar id's únicos, para cada transacción
      id: window.crypto.randomUUID(),
      description,
      amount: +amount,
    });

    // limpio los estados y el form luego de agregar una transacción
    setAmount(0);
    setDescription("");
    const target = e.target;
    target.amount.value = null;
    target.description.value = "";
  };

  return (
    <form
      className="w-full max-w-md flex flex-col gap-2 lg:gap-5 pt-2 mb-3 lg:mb-14"
      // cuando envío el form se ejecuta la función addTransaction
      onSubmit={(e) => {
        sendFormData(e);
      }}
    >
      {/* INPUT DESCRIPCION */}
      <div className="form-control w-full">
        <input
          // guardo el valor en el state description
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          name="description"
          type="text"
          placeholder="Enter a description"
          className="input input-floating peer text-zinc-200 border-none bg-[#161616] lg:h-14"
        />
        <label className="input-floating-label bg-transparent">
          Description
        </label>
      </div>

      {/* INPUT MONTO */}
      <label className="input-group items-center w-full border-none bg-[#161616] lg:h-14">
        <span className="input-group-text">$</span>
        <input
          // guardo el valor en el state amount
          onChange={(e) => {
            const target = e.target;
            setAmount(target.value);
          }}
          name="amount"
          type="number"
          step={0.01}
          className="input text-zinc-200"
          placeholder="00.00"
        />
        <span className="input-group-text">ARS</span>
      </label>

      {/* BOTON PARA AGREGAR TRANSACCION*/}
      <div className="w-full flex justify-end">
        <button
          type="submit"
          className="btn btn-primary waves waves-light lg:h-14"
        >
          Add transaction
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
