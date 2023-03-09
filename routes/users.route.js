import express from "express";
import {
  updateUsers,
  deleteUser,
  getAllUsers,
  getUser,
} from "../controllers/users.controller.js";
import { verifyIsAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//update
router.put("/:id", verifyUser, updateUsers);

// delete
router.delete("/:id", verifyUser, deleteUser);

//Get User

router.get("/:id", verifyUser, getUser);

//Get all
router.get("/", verifyIsAdmin, getAllUsers);

export default router;
