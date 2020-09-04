const initialState = [];

const transaction = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      const id = action.payload._id;
      const transaction = action.payload;
      const transactionObj = {
        id,
        transaction,
      };
      return [...state, transactionObj];
    default:
      return state;
  }
};

export default transaction;
