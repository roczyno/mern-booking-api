import Rooms from "../models/rooms.model.js";
import Hotels from "../models/hotels.model.js";

export const createRooms = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Rooms(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRooms = async (req, res, next) => {
  try {
    const updatedRoom = await Rooms.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;

  try {
    await Rooms.findByIdAndDelete(req.params.id);
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status("deleted successfully");
  } catch (error) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const Room = await Rooms.findById(req.params.id);
    res.status(200).json(Room);
  } catch (error) {
    next(err);
  }
};

export const getAllRooms = async (req, res, next) => {
  try {
    const Rooms = await Rooms.find();
    res.status(200).json(Rooms);
  } catch (error) {
    next(err);
  }
};
