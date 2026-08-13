import { categoryModel } from "../../models/category-model.js";

export const deleteCategory = async (req, res) => {
    
    const newCategory = await categoryModel.findByIdAndDelete(req.body.id);
    res.status(201).json({
        message: "amjilttai",
        category: newCategory,
    });
}