import { Router } from "express";
import Joi from "joi";
import { authenticate } from "../../middlewares/authenticate.js";
import { Product } from "../../models/product.js";
import { Entry } from "../../models/entry.js";

const router = Router();
router.use(authenticate);
const objectId = Joi.string().hex().length(24).required();
const entryInput = Joi.object({
  productId: objectId,
  grams: Joi.number().integer().min(1).max(Number.MAX_SAFE_INTEGER).required(),
}).required();

router.get("/products", async (req, res) => {
  const { value, error } = Joi.string().trim().min(1).max(100).required().validate(req.query.search);
  if (error) return res.status(400).json({ message: "Enter a product name" });
  const escaped = RegExp.escape(value);
  const products = await Product.find({ title: new RegExp(escaped, "i") })
    .sort({ title: 1, _id: 1 }).limit(30).select("title calories weight").lean();
  res.json(products.map(({ _id, title, calories, weight }) => ({
    id: _id, name: title, caloriesPer100g: calories == null ? null : calories * 100 / weight,
  })));
});

router.param("date", (req, res, next, date) => {
  const parsed = new Date(date + "T00:00:00Z");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date)
    return res.status(400).json({ message: "Invalid calendar date" });
  next();
});

function scope(req) {
  return { owner: req.user._id, date: req.params.date };
}

function present({ _id, date, productId, name, grams, calories }) {
  return { id: _id, date, productId, name, grams, calories };
}

router.post("/diary/:date/entries", async (req, res) => {
  const { value, error } = entryInput.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const product = await Product.findById(value.productId);
  if (!product) return res.status(404).json({ message: "Product not found" });
  if (product.calories == null) return res.status(422).json({ message: "Calories unavailable for this product" });
  const entry = await Entry.create({
    ...scope(req), productId: product._id, name: product.title, grams: value.grams,
    calories: Math.round(product.calories * value.grams / product.weight),
  });
  res.status(201).json(present(entry));
});

router.delete("/diary/:date/entries/:entryId", async (req, res) => {
  if (objectId.validate(req.params.entryId).error) return res.status(400).json({ message: "Invalid entry ID" });
  const result = await Entry.deleteOne({ ...scope(req), _id: req.params.entryId });
  if (!result.deletedCount) return res.status(404).json({ message: "Entry not found" });
  res.sendStatus(204);
});

router.get("/diary/:date", async (req, res) => {
  const entries = await Entry.find(scope(req)).sort({ _id: 1 }).lean();
  res.json({ date: req.params.date, entries: entries.map(present),
    consumed: entries.reduce((sum, item) => sum + item.calories, 0) });
});

export default router;
