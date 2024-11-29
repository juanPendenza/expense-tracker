import { VictoryPie, VictoryLabel } from "victory";
import { useGlobalState } from "../context/GlobalState";
import { useEffect, useState } from "react";

function ExpenseChart() {
  // traigo las transacciones del contexto
  const { transactions } = useGlobalState();

  // mapeo porque solo necesito los montos
  const amounts = transactions.map((t) => t.amount);

  // obtengo la suma de los ingresos y los gastos totales por separado
  const totalIncomes = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => (acc += t.amount), 0);
  const totalExpenses =
    transactions
      .filter((t) => t.amount < 0)
      .reduce((acc, t) => (acc += t.amount), 0) * -1;

  // debo darle un valor inicial a los ingresos totales, porque sino al principio vale 0
  // y no puedo dividir por 0 pq da Nan
  // entonces le doy el valor más pequeño posible en js
  const totalExpensesPercentage =
    totalIncomes === 0
      ? Number.MIN_VALUE
      : (totalExpenses / totalIncomes) * 100;

  // calculo el porcentaje de gastos e ingresos totales
  const totalIncomesPercentage = 100 - totalExpensesPercentage;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      const target = e.target;
      setWindowWidth(target.innerWidth);
    });
  }, []);

  return (
    <div className="">
      <VictoryPie
        height={windowWidth < 1024 ? 350 : 225}
        colorScale={["#e74c3c", "#2ecc71"]}
        data={[
          { x: "Expenses", y: Math.round(totalExpensesPercentage) },
          { x: "Incomes", y: Math.round(totalIncomesPercentage) },
        ]}
        labels={({ datum }) => `%${datum.y}`}
        animate={{ duration: 1000 }}
        labelComponent={
          <VictoryLabel
            style={
              windowWidth < 1024
                ? { fontSize: 20, fill: "white" }
                : { fontSize: 10, fill: "white" }
            }
          />
        }
      />
    </div>
  );
}

export default ExpenseChart;
