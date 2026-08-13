import { orderModel } from "../../models/order-model.js"

export const createOrder = async (req, res) => {
    
    const body = req.body;
    const newOrder = await orderModel.create({
        user: body.user,
        totalPrice: body.totalPrice,
        foodOrderItems: body.foodOrderItems,
        status: body.status,
    });
    res.status(201).json ({
        message: "amjilttai",
        order: newOrder,
    })
}