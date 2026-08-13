import { userModel } from "../../models/user-model.js";

export const uptUser = async (req, res) => {
  const updateUser = await userModel.findByIdAndUpdate(req.body.id, {
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  });
  res.status(201).json({
    message: "amjilttai",
    user: updateUser,
  });
};
