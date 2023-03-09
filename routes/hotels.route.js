import express from "express";
const router = express.Router();
import {
  createHotels,
  deleteHotel,
  getHotel,
  updateHotels,
  getAllHotels,
} from "../controllers/hotels.controller.js";
import { verifyIsAdmin, verifyUser } from "../utils/verifyToken.js";

//create

router.post("/", verifyIsAdmin, createHotels);

//update
router.put("/:id", verifyIsAdmin, updateHotels);

// delete
router.delete("/:id", verifyIsAdmin, deleteHotel);

//Get hotel

router.get("/:id", getHotel);

//Get all
router.get("/", getAllHotels);

export default router;
