import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

// Money formatter function (adds commas for thousands, e.g. 1,000)
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    '$ ' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, num, i, orig) {
        return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  // 1. Get all the amounts into an array [5000, -200, -100]
  const amounts = transactions.map(transaction => transaction.amount);

  // 2. Add them all together
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>{moneyFormatter(total)}</h1>
    </>
  )
}