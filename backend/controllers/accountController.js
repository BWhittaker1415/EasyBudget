import asyncHandler from "express-async-handler";
import Account from "../models/accountModel.js";

// ================== REGISTER ACCOUNT ================== //
// desc   =>   Register a new account
// route   =>  POST /api/accounts
// access   =>   Private
const registerAccount = asyncHandler(async (req, res) => {
  const { name, bank, type, creditCard } = req.body;

  const accountExists = await Account.findOne({ name });

  if (accountExists) {
    res.status(400);
    throw new Error("Account already exists");
  }

  const account = await Account.create({
    name,
    bank,
    type,
    creditCard,
  });

  if (account) {
    res.status(201).json({
      _id: account._id,
      name: account.name,
      bank: account.bank,
      type: account.type,
      creditCard: account.creditCard,
    });
  } else {
    res.status(400);
    throw new Error("Invalid account data");
  }
});

// ================== GET ACCOUNT ================== //
// desc   =>   Get an account
// route   =>  GET /api/accounts/account
// access   =>   Private
const getAccount = asyncHandler(async (req, res) => {
  const account = {
    _id: req.account._id,
    name: req.account.name,
    bank: req.account.bank,
    type: req.account.type,
    creditCard: req.account.creditCard,
  };

  res.status(200).json(account);
});

// ================== UPDATE ACCOUNT ================== //
// desc   =>   Update account
// route   =>  PUT /api/accounts/account
// access   =>   Private
const updateAccount = asyncHandler(async (req, res) => {
  const account = await Account.findById(req.account._id);

  if (account) {
    account.name = req.body.name || account.name;
    account.bank = req.body.bank || account.bank;
    account.type = req.body.type || account.type;
    account.creditCard = req.body.creditCard || account.creditCard;

    const updatedAccount = await account.save();

    res.status(200).json({
      _id: updatedAccount._id,
      name: updatedAccount.name,
      bank: updatedAccount.bank,
      type: updatedAccount.type,
      creditCard: updatedAccount.creditCard,
    });
  } else {
    res.status(404);
    throw new Error("Account not found");
  }
});

export { registerAccount, updateAccount, getAccount };
