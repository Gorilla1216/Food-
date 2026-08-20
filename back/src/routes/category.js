import express from "express"; 
import { getCategory } from "../resolvers/category/get-category.js";
import { createCategory } from "../resolvers/category/create-category.js";
import { deleteCategory } from "../resolvers/category/delete-category.js";
import { uptCategory } from "../resolvers/category/update-category.js";
import { getFoodsByCategory } from "../resolvers/category/get-foods-by-category.js";
export const categoryRouter = express.Router();
categoryRouter.get("/", getCategory);
categoryRouter.post("/", createCategory);
categoryRouter.delete("/",deleteCategory );
categoryRouter.put("/", uptCategory);
categoryRouter.get("/:categoryId", getFoodsByCategory)