import express from "express";
const router = express.Router();
import {
  createBudget,
  updateBudget,
  getBudget,
  getBudgetById,
} from "../controllers/budgetController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/create").post(protect, createBudget);
router.route("/").get(protect, getBudget);
router.route("/:id").get(protect, getBudgetById);
router.route("/:id").put(protect, updateBudget);

export default router;
