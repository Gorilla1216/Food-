import { categoryModel } from "../../models/category-model.js";

export const uptCategory = async (req, res) => {
  const uptadeCategory = await categoryModel.findByIdAndUpdate(req.body.id,{
    categoryName: req.body.categoryName,
  });
  res.status(201).json({
    message: "amjilttai",
    category: uptadeCategory,
  });
};
