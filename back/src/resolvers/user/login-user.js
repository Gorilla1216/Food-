import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../models/user-model.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });
  console.log("user", user);

  if (!user) {
    return res.status(401).json({ message: "Email is wrong" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Password is wrong" });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    "jwttoken",
    { expiresIn: "7d" },
  );

  user.password = undefined;

  res.json({ message: "Success", token, user });
};
