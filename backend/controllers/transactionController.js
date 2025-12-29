const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/transactions
exports.getTransactions = async (req, res, next) => {
    try {
        // Find all transactions in the database
        const transactions = await Transaction.find();

        // Send them back to the user
        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc    Add transaction
// @route   POST /api/transactions
exports.addTransaction = async (req, res, next) => {
    try {
        const { text, amount } = req.body;

        // Create a new transaction in the database
        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res, next) => {
    try {
        // Find the transaction by its ID
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found'
            });
        }

        // Remove it
        await transaction.deleteOne();

        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}