import { useGlobalState } from "../context/GlobalState";

function TransactionList() {
  // traigo las transacciones y la función deleteTransaction desde el contexto
  const { transactions, deleteTransaction } = useGlobalState();
  // console.log(transactions);

  return (
    <div className="w-full max-w-md flex flex-col gap-1 overflow-hidden">
      <span className="font-semibold text-zinc-200">History</span>
      {/* mapeo y muestro las transacciones */}
      <ul className="w-full h-24 lg:h-80 p-2 flex flex-col gap-2 bg-[#161616] rounded-lg overflow-y-scroll scroll-m-20">
        {transactions &&
          transactions.map((t) => (
            <li
              key={t.id}
              className="w-full flex items-center border-b border-[#808080] p-2"
            >
              {/* descripción de la transacción */}
              <div className="h-full w-1/2 flex flex-col items-start justify-center">
                <p className="text-zinc-200 ">{t.description}</p>
                {/* monto de la transacción */}
                <span className="text-zinc-200 ">{"$" + t.amount}</span>
              </div>

              {/* botón para eliminar la transacción */}
              <div className="h-full w-1/2 flex justify-end items-center">
                <button
                  onClick={() => {
                    // borro la transacción por su id
                    deleteTransaction(t.id);
                  }}
                  className="btn btn-error waves waves-light rounded-full min-h-2 h-8 w-8"
                >
                  x
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default TransactionList;
