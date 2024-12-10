import { GlobalProvider } from "./context/GlobalState.jsx";
import TransactionForm from "./components/TransactionForm.jsx";
import Balance from "./components/Balance.jsx";
import TransactionList from "./components/TransactionList.jsx";
import IncomeExpenses from "./components/IncomeExpenses.jsx";
import ExpenseChart from "./components/ExpenseChart.jsx";
import { useEffect, useState } from "react";

function App() {
  const [initialTransactions] = useState({
    transactions: [],
  });

  useEffect(() => {
    !localStorage.getItem("transactions")
      ? localStorage.setItem("transactions", initialTransactions)
      : false;
  }, []);

  return (
    <div className="h-screen w-screen bg-[#202020] overflow-hidden p-3 pt-6">
      {/* llamo a los componentes dentro del provider */}
      <GlobalProvider>
        <h1 className="w-full text-center underline underline-offset-8 text-4xl lg:text-5xl text-white font-bold">
          Expense tracker
        </h1>
        <div className="h-full w-full flex flex-col lg:flex-row-reverse items-center lg:items-start justify-start p-2">
          <div className="w-full h-full flex flex-col lg:justify-start">
            <ExpenseChart />
            <div className="w-full flex justify-center items-end gap-2 bg-[#161616] p-3 rounded-lg">
              <IncomeExpenses />
              <Balance />
            </div>
          </div>
          <div className="w-full lg:w-3/4 h-full flex flex-col items-center lg:justify-center">
            <TransactionForm />
            <TransactionList />
          </div>
        </div>
      </GlobalProvider>
    </div>
  );
}

export default App;
