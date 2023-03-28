import hotelsModel from "../models/hotels.model.js";
export const createHotels = async (req, res, next) => {
  const newHotel = new hotelsModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotels = async (req, res, next) => {
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
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await hotelsModel.findByIdAndDelete(req.params.id);
    res.status("deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await hotelsModel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getAllHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await hotelsModel
      .find({ ...others, cheapestPrice: { $gt: min | 1, $lt: max || 999 } })
      .limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const lists = await Promise.all(
      cities.map((city) => {
        return hotelsModel.countDocuments({ city: city });
      })
    );
    res.status(200).json(lists);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await hotelsModel.countDocuments({ type: "hotel" });
    const apartmentCount = await hotelsModel.countDocuments({
      type: "apartment",
    });
    const resortCount = await hotelsModel.countDocuments({ type: "resort" });
    const villaCount = await hotelsModel.countDocuments({ type: "villa" });
    const cabinCount = await hotelsModel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
