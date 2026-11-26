import { caloriesSchema } from "../schemas/calories-schema.js";
import { Calorie } from "../models/calorie.js";

const FORBIDDEN_FOODS_BY_BLOOD_TYPE = {
  1: ["Flour products", "Milk", "Red meat", "Smoked meats"],
  2: ["Meat", "Dairy products", "Wheat", "Tomatoes"],
  3: ["Corn", "Lentils", "Peanuts", "Sesame seeds"],
  4: ["Red meat", "Kidney beans", "Seeds", "Corn"],
};

export const savePrivateCalories = async (req, res, next) => {
  try {
    const { error, value } = caloriesSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const {
      height,
      age,
      currentWeight,
      desiredWeight,
      bloodType,
    } = value;

    const calories = Math.round(
      10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight)
    );

    const forbiddenFoods =
      FORBIDDEN_FOODS_BY_BLOOD_TYPE[bloodType] ||
      FORBIDDEN_FOODS_BY_BLOOD_TYPE[1];

    const savedData = await Calorie.findOneAndUpdate(
      { owner: req.user._id },
      {
        owner: req.user._id,
        height,
        age,
        currentWeight,
        desiredWeight,
        bloodType,
        calories,
        forbiddenFoods,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      height: savedData.height,
      age: savedData.age,
      currentWeight: savedData.currentWeight,
      desiredWeight: savedData.desiredWeight,
      bloodType: savedData.bloodType,
      calories: savedData.calories,
      forbiddenFoods: savedData.forbiddenFoods,
    });
  } catch (err) {
    next(err);
  }
};

export const getPrivateCalories = async (req, res, next) => {
  try {
    const savedData = await Calorie.findOne({
      owner: req.user._id,
    });

    if (!savedData) {
      return res.status(404).json({
        message: "Calorie information not found",
      });
    }

    res.status(200).json({
      height: savedData.height,
      age: savedData.age,
      currentWeight: savedData.currentWeight,
      desiredWeight: savedData.desiredWeight,
      bloodType: savedData.bloodType,
      calories: savedData.calories,
      forbiddenFoods: savedData.forbiddenFoods,
    });
  } catch (err) {
    next(err);
  }
};