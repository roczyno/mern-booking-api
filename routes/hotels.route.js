import express from "express";
const router = express.Router();
import {
  createHotels,
  deleteHotel,
  getHotel,
  updateHotels,
  getAllHotels,
} from "../controllers/hotels.controller.js";

//create

router.post("/", createHotels);

//update
router.put("/:id", updateHotels);

// delete
router.delete("/:id", deleteHotel);

//Get hotel

router.get("/:id", getHotel);

//Get all
router.get("/", getAllHotels);

export default router;
