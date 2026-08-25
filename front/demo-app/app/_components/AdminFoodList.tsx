"use client";

import { useEffect, useState } from "react";
import { Image } from "lucide-react";
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
            <div className="flex ">Add new Dish to {category.categoryName}</div>
            <DialogContent className="max-h-150 h-full w-115 max-w-[full] sm:max-w-115">
              <div className="">
                <DialogHeader>
                  <DialogTitle className="text-[#09090B] text-xl font-semibold ">
                    <div>Add new Dish to {category.categoryName}</div>
                  </DialogTitle>
                  <div className="mt-6 text-[#09090B] text-lg flex flex-col">
                    <div className="flex mt-6 gap-2">
                      <div className="font-medium">
                        Food name
                        <input
                          type="text"
                          placeholder="Type food name"
                          className="border-2 rounded-lg"
                        />
                      </div>
                      <div className="font-medium ">
                        Food price
                        <input
                          type="number"
                          placeholder="Enter price"
                          className="border-2 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col font-medium mt-6 ">
                      Ingredients
                      <textarea
                        placeholder="List ingredients"
                        className="border-2 rounded-lg h-22"
                      ></textarea>
                    </div>
                    <div className="flex flex-col mt-6">
                      Food image
                      <input
                        type="text"
                        placeholder="Choose a file or drag & drop it here"
                        className="border border-dashed bg-[#2563EB0D] h-45 text-center"
                      />
                    </div>
                    <button className="mt-4 w-20 h-10 bg-[#18181B] rounded-lg text-[#FAFAFA] ">Add Dish</button>
                  </div>
                </DialogHeader>
              </div>
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
