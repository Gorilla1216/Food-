"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodIngredients, setFoodIngredients] = useState("");
  const getFoods = async () => {
    const response = await fetch(
      `http://localhost:8000/category/${category._id}`,
    );
    const data = await response.json();
    setFoods(data.foods);
  };

  const createFood = async () => {
    await fetch("http://localhost:8000/food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        foodName: foodName,
        image: "url",
        ingredients: foodIngredients,
        price: foodPrice,
        category: category._id,
      }),
    });
    getFoods();
  };

  useEffect(() => {
    getFoods();
  }, []);
  return (
    <div className="flex flex-col flex-wrap mt-2 gap-2 bg-[#ffffff] rounded-2xl w-full h-full">
      <h1 className="text-2xl font-semibold tracking-tight ml-6 mt-5">
        {category.categoryName} <span>({category.foodCount})</span>
      </h1>
      <div className="flex gap-4 h-80 mt-4 mb-6 px-6">
        <div className="max-h-60 h-full max-w-67 w-full flex flex-col items-center justify-center outline-2 outline-[#EF4444] rounded-2xl outline-dashed">
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center justify-center h-8 w-8 bg-[#EF4444] text-white text-2xl rounded-full ">
                +
              </div>
            </DialogTrigger>
            <div className="flex ">Add new Dish to {category.categoryName}</div>
            <DialogContent className="max-h-150 h-full w-150 max-w-[full] sm:max-w-150">
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
                          onChange={(e) => {
                            setFoodName(e.target.value);
                          }}
                          value={foodName}
                        />
                      </div>
                      <div className="font-medium ">
                        Food price
                        <input
                          type="number"
                          placeholder="Enter price"
                          className="border-2 rounded-lg"
                          onChange={(e) => {
                            setFoodPrice(e.target.value);
                          }}
                          value={foodPrice}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col font-medium mt-6 ">
                      Ingredients
                      <input
                        placeholder="List ingredients"
                        className="border-2 rounded-lg h-22 placeholder:flex justify-start"
                        onChange={(e) => {
                          setFoodIngredients(e.target.value);
                        }}
                        value={foodIngredients}
                      ></input>
                    </div>
                    <div className="flex flex-col mt-6">
                      Food image
                      <input
                        type="file"
                        placeholder="Choose a file or drag & drop it here"
                        className="border border-dashed bg-[#2563EB0D] h-45 text-center"
                      />
                    </div>
                    <button
                      onClick={createFood}
                      className="mt-4 w-20 h-10 bg-[#18181B] rounded-lg text-[#FAFAFA] "
                    >
                      Add Dish
                    </button>
                  </div>
                </DialogHeader>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-wrap h-80 w-full gap-4">
          {foods.map((food: any) => {
            return (
              <div key={food._id} className="max-h-60 h-full max-w-67 w-full flex flex-col items-center justify-center outline-2 outline-[#E4E4E7] rounded-2xl">
                <div className="-mt-5 max-h-33 h-full max-w-60 2-full flex items-center rounded-2xl bg-amber-500">
                  <Image src="/next.svg" alt="temporary img" width={500} height={130} />
                </div>
                <div className="flex justify-between w-full px-4 mt-2">
                  <span className="text-base text-[#EF4444] font-medium">{food.foodName} </span>
                  <span className="text-sm text-[#09090B] font-normal"> {food.price}</span>
                 </div>  
                <div>
                  <span className="text-sm text-[#09090B] font-normal">{food.ingredients}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
