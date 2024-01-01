import { router as userrouter } from "./routes/user";
import { router as authrouter } from "./routes/auth";
import { router as myHotelRouter } from "./routes/myHotels";
import { mongoConnect } from "./core/database";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import path from "path";
import "dotenv/config";

const mongouri = process.env.MONGO_DATABASE_URI || "";
const clienturi = process.env.FRONT_END_URI || "";

const app = express();

async function initialize(app: Express) {
  await mongoConnect(mongouri);
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log("Initialize our express app");
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: clienturi,
      credentials: true,
    })
  );
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.use("/api/users", userrouter);
  app.use("/api/auth", authrouter);
  app.use("/api/my-hotels", myHotelRouter);

  console.log("Express application initialized");
  return app;
}

initialize(app).then((app) => {
  console.log("Trying to start our express server");
  app.listen(7000, () => {
    console.log("Server is running on localhost:7000");
  });
});
