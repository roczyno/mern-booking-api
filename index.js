import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRoute from "./routes/auth.route.js";
import UsersRoute from "./routes/users.route.js";
import RoomsRoute from "./routes/rooms.route.js";
import HotelsRoute from "./routes/hotels.route.js";
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

//middlewares
app.use(express.json());
app.use("/api/auth", AuthRoute);
app.use("/api/users", UsersRoute);
app.use("/api/hotels", HotelsRoute);
app.use("/api/rooms", RoomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    stack: err.stack,
    message: errorMessage,
    status: errorStatus,
  });
});
app.listen(5000, () => {
  connect();
  console.log("server running..");
});
