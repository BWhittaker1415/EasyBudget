import asyncHandler from "express-async-handler";
import Budget from "../models/budgetModel.js";

// ================== CREATE NEW BUDGET ================== //
// desc   =>   Create a new budget
// route   =>  POST /api/budgets
// access   =>   Private
const createBudget = asyncHandler(async (req, res) => {
  const { category, name, date, cost, progressTotal } = req.body;

  if (!category || !name || !date || !cost || !progressTotal) {
    res.status(400);
    throw new Error("Invalid data");
  } else {
    const newBudget = new Budget({
      category,
      name,
      date,
      cost,
      progressTotal,
    });

    const createdBudget = await newBudget.save();
    res.status(201).json(createdBudget);
  }
});

// ================== GET BUDGET ================== //
// desc   =>   Get all budgets
// route   =>  GET /api/budgets
// access   =>   Private
const getBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.find({});
  res.status(200).json(budget);
});

// ================== GET ONE BUDGET ================== //
// desc   =>   Get budget details
// route   =>  GET /api/budgets/:id
// access   =>   Private
const getBudgetById = asyncHandler(async (req, res) => {
  const budget = await Budget.findById(req.params.id);

  if (budget) {
    return res.json(budget);
  } else {
    res.status(404);
    throw new Error("Budget not found");
  }
});

// ================== UPDATE BUDGET ================== //
// desc   =>   Update budget to paid
// route   =>  GET /api/budgets/:id
// access   =>   Private
const updateBudget = asyncHandler(async (req, res) => {
  const { category, name, date, cost, progressTotal } = req.body;

  const budget = await Budget.findById(req.params.id);

  if (budget) {
    budget.category = category;
    budget.name = name;
    budget.date = date;
    budget.cost = cost;
    budget.progressTotal = progressTotal;

    const updatedBudget = await budget.save();
    res.json(updatedBudget);
  } else {
    res.status(404);
    throw new Error("Budget not found");
  }
});

// ================== DELETE BUDGET ================== //
// desc   =>   Delete budget
// route   =>  DELETE /api/budgets/:id
// access   =>   Private
const deleteBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.findById(req.params.id);

  if (budget) {
    await Budget.deleteOne({ _id: budget._id });
    res.status(200).json({ message: "Budget deleted" });
  } else {
    res.status(404);
    throw new Error("Budget not found");
  }
});

export { createBudget, getBudget, getBudgetById, updateBudget, deleteBudget };
