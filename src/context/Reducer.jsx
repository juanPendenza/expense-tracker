// llamo reducer a las funciones que le voy a pasar al useReducer "state", que creé en el contexto
// esta función espera dos parámetros, el estado y las acciones que queremos realizar

// creo los tipos de dato action y state
export default (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      // una vez que recibo una transacción devuelvo las transacciones que ya tenía en el state
      // y le agrego una nueva transacción y su valor
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "DELETE_TRANSACTION":
      // acá filtramos las transacciones con un id distinto del que llega en action.payload
      // es decir se van a mostrar todas las transacciones, excepto la que tenga el id que llega
      // asi estamos borrando la transacción
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
};
