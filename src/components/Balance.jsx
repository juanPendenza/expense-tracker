import { useGlobalState } from "../context/GlobalState";

function Balance() {
  // traigo las transacciones del contexto
  const { transactions } = useGlobalState();

  // mapeo porque solo necesito los montos
  const amounts = transactions && transactions.map((t) => t.amount);

  // la función reduce va sumando los montos de las transacciones(amount) y los acumula(acc)
  // y al valor acumulado le doy un valor inicial de 0
  const total = amounts.reduce((acc, amount) => (acc += amount), 0);
  return (
    <div className="w-3/4 flex justify-end gap-2">
      <h1 className="text-2xl lg:text-4xl font-bold text-zinc-200">TOTAL</h1>
      <span className="text-zinc-200 text-2xl lg:text-4xl font-bold">
        {"$" + Math.round(total)}
      </span>
    </div>
  );
}

export default Balance;
