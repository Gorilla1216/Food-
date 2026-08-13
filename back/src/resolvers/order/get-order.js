import { orderModel } from "../../models/order-model.js";

export const getOrder = async (req, res) => {
  const order = await orderModel
    .find()
    .populate("user")
    .populate("foodOrderItems.food");

  res.status(200).json(order);
};
