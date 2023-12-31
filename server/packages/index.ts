import { router as userrouter } from "./routes/user";
import { router as authrouter } from "./routes/auth";
import { mongoConnect } from "./core/database";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

const mongouri = process.env.MONGO_DATABASE_URI || "";
const clienturi = process.env.FRONT_END_URI || "";

const app = express();

async function initialize(app: Express) {
  await mongoConnect(mongouri);

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

  app.use("/api/users", userrouter);
  app.use("/api/auth", authrouter);

  console.log("Express application initialized");
  return app;
}

initialize(app).then((app) => {
  console.log("Trying to start our express server");
  app.listen(7000, () => {
    console.log("Server is running on localhost:7000");
  });
});
