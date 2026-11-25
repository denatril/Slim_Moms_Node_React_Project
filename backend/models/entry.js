import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, required: true },
  date: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: String,
  grams: Number,
  calories: Number,
});
entrySchema.index({ owner: 1, date: 1 });
export const Entry = mongoose.model("Entry", entrySchema);
