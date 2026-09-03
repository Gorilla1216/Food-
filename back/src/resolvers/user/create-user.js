import bcrypt from "bcrypt";
import { userModel } from "../../models/user-model.js";

export const createUser = async (req, res) => {
  const body = req.body;
  const hashedPassword = await bcrypt.hash(body.password, 10);
  console.log("Password", hashedPassword);
  const newUser = await userModel.create({
    email: body.email,
    password: hashedPassword,
    phoneNumber: body.phoneNumber,
    address: body.address,
    orderedFoods: body.orderedFoods,
    isVerified: body.isVerified,
  });
  res.status(201).json({
    message: "amjilttai",
    user: newUser,
  });
};
