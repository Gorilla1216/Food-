import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const FoodSchema = new Schema({
  id: ObjectId,
  foodName: String,
  price: Number,
  image: String,
  ingredients: String,
  category: {
    type: ObjectId,
    ref: "category",
  },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const foodModel = mongoose.model("food", FoodSchema);
