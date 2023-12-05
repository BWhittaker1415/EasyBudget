import asyncHandler from "express-async-handler";
import Budget from "../models/budgetModel.js";

// ================== REGISTER BUDGET ================== //
// desc   =>   Register a new budget
// route   =>  POST /api/budgets
// access   =>   Private
const registerBudget = asyncHandler(async (req, res) => {
  const { category, name, date, cost } = req.body;

  const budgetExists = await Budget.findOne({ name });

  if (budgetExists) {
    res.status(400);
    throw new Error("budget already exists");
  }

  const budget = await Budget.create({
    category,
    name,
    date,
    cost,
  });

  if (budget) {
    res.status(201).json({
      _id: budget._id,
      category: budget.category,
      name: budget.name,
      date: budget.date,
      cost: budget.cost,
    });
  } else {
    res.status(400);
    throw new Error("Invalid budget data");
  }
});

// ================== GET BUDGET ================== //
// desc   =>   Get an budget
// route   =>  GET /api/budgets/budget
// access   =>   Private
const getBudget = asyncHandler(async (req, res) => {
  const budget = {
    _id: req.budget._id,
    name: req.budget.name,
    bank: req.budget.bank,
    type: req.budget.type,
  };

  res.status(200).json(budget);
});

// ================== UPDATE BUDGET ================== //
// desc   =>   Update budget
// route   =>  PUT /api/budgets/budget
// access   =>   Private
const updateBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.findById(req.budget._id);

  if (budget) {
    budget.category = req.body.category || budget.category;
    budget.name = req.body.name || budget.name;
    budget.date = req.body.date || budget.date;
    budget.cost = req.body.cost || budget.cost;

    const updatedBudget = await budget.save();

    res.status(200).json({
      _id: updatedBudget._id,
      category: updatedBudget.category,
      name: updatedBudget.name,
      date: updatedBudget.date,
      cost: updatedBudget.cost,
    });
  } else {
    res.status(404);
    throw new Error("Budget not found");
  }
});

export { registerBudget, updateBudget, getBudget };
