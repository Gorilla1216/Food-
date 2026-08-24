"use client";

import { useEffect, useState } from "react";
import { CategoryType } from "../Admin/page";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const AdminFoodList = ({ category }: { category: CategoryType }) => {
  const [foods, setFoods] = useState([]);
  const getFoods = async () => {
    const response = await fetch(
      `http://localhost:8000/category/${category._id}`,
    );
    const data = await response.json();
    setFoods(data.foods);
  };
  useEffect(() => {
    getFoods();
  }, []);
  return (
    <div className="flex flex-col flex-wrap mt-2 gap-2 bg-[#ffffff] rounded-2xl ">
      <h1 className="text-2xl font-semibold tracking-tight ml-6 mt-5">
        {category.categoryName} <span>({category.foodCount})</span>
      </h1>
      <div className="grid grid-cols-4 gap-4 ml-6 mt-4 h-80">
        <div className="max-h-60 h-full max-w-67 w-full flex flex-col items-center justify-center outline-2 outline-[#EF4444] rounded-2xl outline-dashed">
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center justify-center h-8 w-8 bg-[#EF4444] text-white text-2xl rounded-full ">
                +
              </div>
            </DialogTrigger>
            <div className="flex ">
              Add new Dish to {category.categoryName}
            </div>
            <DialogContent className="max-h-68 h-full max-w-115 w-full">
              <DialogHeader>
                <DialogTitle className="text-[#09090B] text-xl font-semibold ">
                  <div>
                    Add new Dish to {category.categoryName}
                  </div>
                </DialogTitle>
                <DialogDescription className="mt-6 text-[#09090B] text-lg">
                  Category name
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col"></div>
            </DialogContent>
          </Dialog>
        </div>

        {foods.map((food: any) => {
          return <div key={food._id}> {food.foodName} </div>;
        })}
      </div>
    </div>
  );
};
