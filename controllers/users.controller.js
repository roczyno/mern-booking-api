import usersModel from "../models/users.model.js";

export const updateUsers = async (req, res, next) => {
  try {
    const updatedUser = await usersModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await usersModel.findByIdAndDelete(req.params.id);
    res.status("deleted successfully");
  } catch (error) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await usersModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersModel.find();
    res.status(200).json(users);
  } catch (error) {
    next(err);
  }
};
