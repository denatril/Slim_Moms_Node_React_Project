import "dotenv/config";
import mongoose from "mongoose";
import { readFile } from "node:fs/promises";
import { Product } from "../models/product.js";

const catalog = JSON.parse(await readFile(new URL("../data/products.json", import.meta.url), "utf8"));
try {
  await mongoose.connect(process.env.DB_HOST);
  await Product.bulkWrite(catalog.map(({ _id, __v, ...product }) => ({
    updateOne: {
      filter: { _id: _id.$oid },
      update: { $set: { ...product, calories: product.calories ?? null } },
      upsert: true,
    },
  })));
} finally {
  await mongoose.disconnect();
}
