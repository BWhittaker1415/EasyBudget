import express from "express";
const router = express.Router();
import {
  registerBudget,
  updateBudget,
  getBudget,
} from "../controllers/budgetController.js";

router.post("/budgets", registerBudget);
router.get("/budgets/budget", getBudget);
router.put("/budgets/budget", updateBudget);

export default router;
