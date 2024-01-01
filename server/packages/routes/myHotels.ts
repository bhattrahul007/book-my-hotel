import { Router, Request, Response, Express } from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { HotelModel, HotelType } from "../model/hotels";
import { authenticateRequestToken } from "../core/middleware/authenticate";
import { body } from "express-validator";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

// api for my hotels
router.post(
  "/",
  authenticateRequestToken,
  [
    body("name").notEmpty().withMessage("Hotel name is required."),
    body("city").notEmpty().withMessage("City is required."),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("price per night is required"),
    body("facilities").notEmpty().isArray().withMessage("Country is required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // upload the images to cloudinary
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let datauri = "data:" + image.mimetype + ";base64," + b64;

        const res = await cloudinary.uploader.upload(datauri);
        return res.url;
      });

      const imageurls = await Promise.all(uploadPromises);

      // if upload success add the url to new hotel
      newHotel.imageUrls = imageurls;

      // save the new hotel in our database
      newHotel.lastModified = new Date();
      newHotel.userId = req.userId;
      const hotel = new HotelModel(newHotel);
      await hotel.save();
      return res.status(201).json({ item: hotel });

      // return 201 status
    } catch (error) {
      console.error("error creating hotel", error);
      return res.status(500).json({ message: "Somthing went wrong." });
    }
  }
);

export { router };
