import express from "express";
const router = express.Router();

import {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  testUsers,
} from "../controllers/user.js";
import { ChildPayment } from "../controllers/ChildPayment.js";

router.post("/create", ChildPayment);
router.post("/test", testUsers);
router.get("/", getUsers);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);

export default router;
