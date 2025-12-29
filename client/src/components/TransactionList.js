import React, { useContext, useEffect } from 'react';
import { Transaction } from './Transaction'; // Import the new component
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  // 1. Get the transactions and the function to fetch them
  const { transactions, getTransactions } = useContext(GlobalContext);

  // 2. Run this when the page loads
  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
            <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </>
  )
}