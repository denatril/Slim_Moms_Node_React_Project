import { Product } from "../models/product.js";

export async function getCalorieResult({ height, age, currentWeight, desiredWeight, bloodType }) {
  const calories = Math.round(10 * currentWeight + 6.25 * height - 5 * age - 161
    - 10 * (currentWeight - desiredWeight));
  const forbiddenFoods = await Product.distinct("title", {
    [`groupBloodNotAllowed.${bloodType}`]: true,
  });
  return { calories, forbiddenFoods: forbiddenFoods.sort() };
}
