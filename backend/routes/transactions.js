const express = require('express');
const router = express.Router();
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactionController');

// When user visits /api/transactions
router.route('/')
    .get(getTransactions)   // If they use GET, show list
    .post(addTransaction);  // If they use POST, add new

// When user visits /api/transactions/:id (like /api/transactions/654a...)
router.route('/:id')
    .delete(deleteTransaction);

module.exports = router;