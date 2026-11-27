
import Joi from "joi";

export const caloriesSchema = Joi.object({
  height: Joi.number().min(100).max(250).required(),
  age: Joi.number().integer().min(18).max(100).required(),
  currentWeight: Joi.number().min(30).max(300).required(),
  desiredWeight: Joi.number().min(30).max(300).required(),
  rhFactor: Joi.string().valid("+", "-").allow(null),
  bloodType: Joi.number().integer().min(1).max(4).default(1),
}).required();
