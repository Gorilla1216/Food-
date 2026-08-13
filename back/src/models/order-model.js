import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const foodOrderItem = new Schema({
  food: {
    type: ObjectId,
    ref: "food",
  },
  quantity: Number,
});

const OrderSchema = new Schema({
  id: ObjectId,
  user: {
    type: ObjectId,
    ref: "user",
  },
  totalPrice: Number,
  foodOrderItems: [foodOrderItem],
  status: {
    type: String,
    enum: ["Pending", "Cancelled", "Deliverd"],
    default: "Pending",
  },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const orderModel = mongoose.model("order", OrderSchema);
