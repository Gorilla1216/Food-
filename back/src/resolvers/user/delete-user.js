import { userModel } from "../../models/user-model.js";

export const deleteUser = async (req, res) => {
    const delUser = await userModel.findByIdAndDelete(req.body.id);
    res.status(201).json({
        message: "amjilttai",
        user: delUser,
    })
}