import { foodModel } from "../../models/food-model.js";

export const getFoodsByCategory = async (req, res) => {
  const foods = await foodModel.find({ category: req.params.categoryId});

  res.status(200).json({
    foods,
  });
};
