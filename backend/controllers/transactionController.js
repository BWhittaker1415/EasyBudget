import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel.js";

// ================== REGISTER TRANSACTION ================== //
// desc   =>   Register a new transaction
// route   =>  POST /api/transactions
// access   =>   Private
const registerTransaction = asyncHandler(async (req, res) => {
  const { category, name, date, amount } = req.body;

  const transactionExists = await Transaction.findOne({ name });

  if (transactionExists) {
    res.status(400);
    throw new Error("transaction already exists");
  }

  const transaction = await Transaction.create({
    category,
    name,
    date,
    amount,
  });

  if (transaction) {
    res.status(201).json({
      _id: transaction._id,
      category: transaction.category,
      name: transaction.name,
      date: transaction.date,
      amount: transaction.amount,
    });
  } else {
    res.status(400);
    throw new Error("Invalid transaction data");
  }
});

// ================== GET TRANSACTION ================== //
// desc   =>   Get an transaction
// route   =>  GET /api/transactions/transaction
// access   =>   Private
const getTransaction = asyncHandler(async (req, res) => {
  const transaction = {
    _id: req.transaction._id,
    name: req.transaction.name,
    bank: req.transaction.bank,
    type: req.transaction.type,
  };

  res.status(200).json(transaction);
});

// ================== UPDATE TRANSACTION ================== //
// desc   =>   Update transaction
// route   =>  PUT /api/transactions/transaction
// access   =>   Private
const updateTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.transaction._id);

  if (transaction) {
    transaction.category = req.body.category || transaction.category;
    transaction.name = req.body.name || transaction.name;
    transaction.date = req.body.date || transaction.date;
    transaction.amount = req.body.amount || transaction.amount;

    const updatedTransaction = await transaction.save();

    res.status(200).json({
      _id: updatedTransaction._id,
      category: updatedTransaction.category,
      name: updatedTransaction.name,
      date: updatedTransaction.date,
      amount: updatedTransaction.amount,
    });
  } else {
    res.status(404);
    throw new Error("Transaction not found");
  }
});

export { registerTransaction, updateTransaction, getTransaction };
