import { foodModel } from "../../models/food-model.js";

export const uptFood = async (req, res) => {
  const updateFood = await foodModel.findByIdAndUpdate(req.body.id, {
    price: req.body.price,
  });
  res.status(201).json({
    messaege: "amjilttai",
    food: updateFood,
  });
};
