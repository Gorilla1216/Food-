import { userModel } from "../../models/user-model.js";

export const createUser = async (req, res) => {
  const body = req.body;
  const newUser = await userModel.create({
    email: body.email,
    password: body.password,
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

