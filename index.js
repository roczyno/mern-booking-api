import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongoDb");
  } catch (error) {
    console.log(error);
  }
};

app.listen(5000, () => {
  connect();
  console.log("server running..");
});
