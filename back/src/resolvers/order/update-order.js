import { orderModel } from "../../models/order-model.js";

export const uptOrder = async (req, res) => {
  const updateOrder = await orderModel.findByIdAndUpdate(req.body.id, {
    foodOrderItems: req.body.foodOrderItems,
  });
  res.status(201).json({
    message: "amjilttai",
    order: updateOrder,
  })
};
