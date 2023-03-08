import express from "express";
const router = express.Router();

import hotelsModel from "../models/hotels.model.js";

//create

router.post("/", async (req, res) => {
  const newHotel = new hotelsModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await hotelsModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    await hotelsModel.findByIdAndDelete(req.params.id);
    res.status("deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get hotel

router.get("/:id", async (req, res) => {
  try {
    const hotel = await hotelsModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all
router.get("/", async (req, res) => {
  try {
    const hotels = await hotelsModel.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
