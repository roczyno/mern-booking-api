import express from "express";
import {
  createRooms,
  deleteRoom,
  getAllRooms,
  getRoom,
  updateRooms,
} from "../controllers/rooms.controller.js";
import { verifyIsAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//create
router.post("/:hotelId", verifyIsAdmin, createRooms);
//update
router.put("/:id", verifyIsAdmin, updateRooms);

// delete
router.delete("/:id/:hotelId", verifyIsAdmin, deleteRoom);

//Get hotel

router.get("/:id", getRoom);

//Get all
router.get("/", getAllRooms);
export default router;
