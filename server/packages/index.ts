import { router as userrouter } from "./routes/user";
import { mongoConnect } from "./core/database";
import express, { Express } from "express";
import cors from "cors";
import "dotenv/config";

const mongouri = process.env.MONGO_DATABASE_URI || "";

const app = express();

async function initialize(app: Express) {
  await mongoConnect(mongouri);

  console.log("Initialize our express app");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/api/users", userrouter);

  console.log("Express application initialized");
  return app;
}

initialize(app).then((app) => {
  console.log("Trying to start our express server");
  app.listen(7000, () => {
    console.log("Server is running on localhost:7000");
  });
});
