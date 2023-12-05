import express from "express";
const router = express.Router();
import {
  registerTransaction,
  updateTransaction,
  getTransaction,
} from "../controllers/transactionController.js";

router.post("/transactions", registerTransaction);
router.get("/transactions/transaction", getTransaction);
router.put("/transactions/transaction", updateTransaction);

export default router;
