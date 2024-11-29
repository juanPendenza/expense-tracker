import { createContext, useContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

// el hook createContext de react nos permite crear un contexto
// y al ejecutarlo nos va a devolver un objeto (es un componente)
export const Context = createContext({});

// con el hook useContext le decimos a react que vamos a utilizar el contexto "Context" que creamos arriba
// el contexto nos va a devolver datos en forma de objeto
export const useGlobalState = () => {
  const context = useContext(Context);
  return context;
};

// valor initial del state
const initialState = {
  transactions: [],
};

// esto nos va a retornar un componente que viene a partir del contexto
// es un componente que va a englobar a otros y tiene elementos, los cuales van a poder acceder a los datos
// que tenga el provider (en este caso retorno las transacciones que tenga el state)
export const GlobalProvider = ({ children }) => {
  // el useReducer es como un useState pero nos permite actualizar el estado parcialmente
  // y podemos agregar funciones que vamos a utilizar sobre el state
  // en el caso del reducer, a la función que setea el estado se la llama dispatch
  // el tercer parámetro es una función para darle un valor al inicio, es distinto del initialState
  const [state, dispatch] = useReducer(Reducer, initialState, () => {
    // traigo las transacciones que hay en el localStorage, en forma de objeto
    // sino dejon el valor inicial initialState
    return (
      localStorage.getItem("transactions") &&
      JSON.parse(localStorage.getItem("transactions"))
    );
  });

  // cada vez que el state cambia guardo los datos en el local storage en forma de json
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state));
  }, [state]);

  // dentro del provider creamos una función que agrega las transacciones que vienen desde el TransactionForm
  // recibe como parámetro la descripción y el monto, de la transacción que agregamos
  const addTransaction = (transaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  };

  // dentro del provider creamos una función que elimina una transacción
  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  return (
    <Context.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </Context.Provider>
  );
};
