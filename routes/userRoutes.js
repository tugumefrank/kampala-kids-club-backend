import express from "express";
const router = express.Router();

import {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  testUsers,
} from "../controllers/user.js";

router.post("/create", createUsers);
router.post("/test", testUsers);
router.get("/", getUsers);
router.put("/:id", updateUsers);
router.delete("/:id", deleteUsers);

export default router;
