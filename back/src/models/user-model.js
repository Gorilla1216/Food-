import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  email: String,
  password: String,
  phoneNumber: String,
  address: String,
  role: {
    type: String,
    enum: ["User", "Admin"],
  },
  orderedFoods: [String],
  isVerified: Boolean,
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const userModel = mongoose.model("user", UserSchema);