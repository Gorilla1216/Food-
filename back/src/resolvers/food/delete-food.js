import { foodModel } from "../../models/food-model.js";

export const deleteFood = async (req, res) => {
  const delFood = await foodModel.findByIdAndDelete(req.body.id);
  res.status(201).json({
    message: "amjilttai",
    food: delFood,
  });
};
