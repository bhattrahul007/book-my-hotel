import express, { Request, Response, Express } from "express";
import { mongoConnect } from "./core/database";
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

  app.get("/api/test", async (req: Request, res: Response) => {
    res.json({ message: "hello from express endpoint" });
  });
  console.log("Express application initialized");
  return app;
}

initialize(app).then((app) => {
  console.log("Trying to start our express server");
  app.listen(7000, () => {
    console.log("Server is running on localhost:7000");
  });
});
