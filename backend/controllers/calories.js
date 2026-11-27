import { getCalorieResult } from "../services/calories.js";
import { caloriesSchema } from "../schemas/calories-schema.js";

export const calculateCalories = async (req, res, next) => {
  try {
    const { error, value } = caloriesSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { calories, forbiddenFoods } = await getCalorieResult(value);

    res.status(200).json({
      calories,
      forbiddenFoods,
    });
  } catch (err) {
    next(err);
  }
};
