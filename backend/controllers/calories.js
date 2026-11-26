
import { caloriesSchema } from "../schemas/calories-schema.js";

const FORBIDDEN_FOODS_BY_BLOOD_TYPE = {
  1: ["Flour products", "Milk", "Red meat", "Smoked meats"],
  2: ["Meat", "Dairy products", "Wheat", "Tomatoes"],
  3: ["Corn", "Lentils", "Peanuts", "Sesame seeds"],
  4: ["Red meat", "Kidney beans", "Seeds", "Corn"],
};

export const calculateCalories = (req, res, next) => {
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

    res.status(200).json({
      calories,
      forbiddenFoods,
    });
  } catch (err) {
    next(err);
  }
};
