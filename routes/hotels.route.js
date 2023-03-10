import express from "express";
const router = express.Router();
import {
  createHotels,
  deleteHotel,
  getHotel,
  updateHotels,
  getAllHotels,
  countByCity,
  countByType,
} from "../controllers/hotels.controller.js";
import { verifyIsAdmin, verifyUser } from "../utils/verifyToken.js";

//create

router.post("/", verifyIsAdmin, createHotels);

//update
router.put("/:id", verifyIsAdmin, updateHotels);

// delete
router.delete("/:id", verifyIsAdmin, deleteHotel);

//Get hotel

router.get("/find/:id", getHotel);

//Get all
router.get("/", getAllHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
