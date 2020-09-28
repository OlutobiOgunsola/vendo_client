import axios from 'axios';

const setTransaction = (review) => {
  return {
    type: 'ADD_TRANSACTION',
    payload: review,
  };
};

const beginGetTransaction = () => {
  return {
    type: 'BEGIN_GET_TRANSACTION',
  };
};

const getTransactionSuccess = () => {
  return {
    type: 'GET_TRANSACTION_SUCCESS',
  };
};

const setTransactionsByUID = (review) => {
  return {
    type: 'ADD_TRANSACTIONS_BY_UID',
    payload: review,
  };
};

const beginGetTransactionsByUID = () => {
  return {
    type: 'BEGIN_GET_TRANSACTION_BY_UID',
  };
};

const getTransactionByUIDSuccess = () => {
  return {
    type: 'GET_TRANSACTION_BY_UID_SUCCESS',
  };
};

export const getTransaction = (id) => {
  return (dispatch) => {
    dispatch(beginGetTransaction);
    return axios
      .get(`${process.env.REACT_APP_API_PREFIX}/api/transactions/${id}`)
      .then((res) => {
        const transaction = res.data.data;

        dispatch(setTransaction(transaction));

        const emptyCache = [];
        const cachedTransactions =
          JSON.parse(localStorage.getItem('vendo_cached_transactions')) ||
          emptyCache;

        localStorage.setItem(
          'vendo_cached_transactions',
          JSON.stringify(cachedTransactions),
        );

        return transaction;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getTransactionsByUserID = (id) => {
  return (dispatch) => {
    dispatch(beginGetTransactionsByUID);
    return axios
      .get(
        `${process.env.REACT_APP_API_PREFIX}/api/transactions/getAllByUser/${id}`,
      )
      .then((res) => {
        const transactions = res.data.data;

        dispatch(setTransactionsByUID(transactions));

        const emptyCache = [];
        const cachedTransactions =
          JSON.parse(
            localStorage.getItem('vendo_cached_transactions_by_uid'),
          ) || emptyCache;

        // cachedReviews.push(review);

        localStorage.setItem(
          'vendo_cached_transactions_by_uid',
          JSON.stringify(cachedTransactions),
        );

        return transactions;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
