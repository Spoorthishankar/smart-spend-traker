import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios'; // Import Axios

// Initial State
const initialState = {
  transactions: [],
  error: null,
  loading: true
}

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  
  // 1. Get all transactions from DB
  async function getTransactions() {
    try {
      const res = await axios.get('/api/transactions'); // Calls backend

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data.data // Sends the data to the reducer
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response.data.error
      });
    }
  }

  // 2. Delete transaction from DB
  async function deleteTransaction(id) {
    try {
        await axios.delete(`/api/transactions/${id}`);

        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    } catch (err) {
        dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
        });
    }
  }

  // 3. Add transaction to DB
  async function addTransaction(transaction) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/transactions', transaction, config);

        dispatch({
            type: 'ADD_TRANSACTION',
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
        });
    }
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    getTransactions,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}