import mongoose from "mongoose";

const calorieSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    height: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    currentWeight: {
      type: Number,
      required: true,
    },
    desiredWeight: {
      type: Number,
      required: true,
    },
    bloodType: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    forbiddenFoods: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Calorie = mongoose.model("Calorie", calorieSchema);