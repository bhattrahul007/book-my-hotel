import { Schema, model } from "mongoose";

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastModified: Date;
};

let schema = new Schema<HotelType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  type: { type: String, required: true },
  adultCount: { type: Number, required: true, default: 0 },
  childCount: { type: Number, required: true },
  facilities: [{ type: String, required: true }],
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [{ type: String, required: true }],
  lastModified: { type: Date, required: true },
});

export const HotelModel = model<HotelType>("hotels", schema);
