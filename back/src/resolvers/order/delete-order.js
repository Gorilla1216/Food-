import { orderModel } from "../../models/order-model.js"

export const deleteOrder = async (req, res) => {
    const delOrder = await orderModel.findByIdAndDelete(req.body.id);
    res.status(201).json({
        message: "amjilttai",
        order: delOrder,
    })
}