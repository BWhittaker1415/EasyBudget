import express from "express";
const router = express.Router();
import {
  registerAccount,
  updateAccount,
  getAccount,
} from "../controllers/accountController.js";

router.post("/accounts", registerAccount);
router.get("/accounts/account", getAccount);
router.put("/accounts/account", updateAccount);

export default router;
