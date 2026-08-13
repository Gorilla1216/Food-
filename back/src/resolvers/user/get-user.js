import { userModel } from "../../models/user-model.js";

export const getUser = async (req, res) => {
  const user = await userModel.find();

  res.status(200).json(user);
};
