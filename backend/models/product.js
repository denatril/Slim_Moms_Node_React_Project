import mongoose from "mongoose";

export const Product = mongoose.model("Product", new mongoose.Schema({
  title: String,
  categories: String,
  weight: Number,
  calories: Number,
  groupBloodNotAllowed: [Boolean],
}));
