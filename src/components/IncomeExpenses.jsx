import { useGlobalState } from "../context/GlobalState";

function IncomeExpenses() {
  // traigo las transacciones del contexto
  const { transactions } = useGlobalState();

  // mapeo porque solo necesito los montos
  const amounts = transactions && transactions.map((t) => t.amount);

  // obtengo los ingresos y los gastos
  const incomes = amounts.filter((a) => a > 0);
  const expenses = amounts.filter((a) => a < 0);

  // obtengo la suma de los ingresos y los gastos por separado
  const totalIncomes = incomes.reduce((acc, income) => (acc += income), 0);

  const totalExpenses = expenses.reduce((acc, expense) => (acc += expense), 0);

  return (
    <div className="w-1/4">
      <div>
        <h4 className="text-zinc-200 text-lg lg:text-2xl font-semibold">
          Incomes
        </h4>
        <p className="text-zinc-200 text-md lg:text-xl">
          {"$" + Math.round(totalIncomes)}
        </p>
      </div>
      <div>
        <h4 className="text-zinc-200 text-lg lg:text-2xl font-semibold">
          Expenses
        </h4>
        <p className="text-zinc-200 text-md lg:text-xl">
          {"$" + Math.round(totalExpenses) * -1}
        </p>
      </div>
    </div>
  );
}

export default IncomeExpenses;
