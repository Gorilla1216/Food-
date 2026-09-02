"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdminFoodList } from "./adminFoodList";
export type CategoryType = {
  categoryName: string;
  _id: string;
  foodCount: number;
};

export const FoodMenu = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [totalFoods, setTotalFoods] = useState(0);
  const [categgoryName, setCategoryName] = useState("");

  const getCategory = async () => {
    try {
      const res = await fetch("http://localhost:8000/category");
      const data = await res.json();
      setCategories(data.categories);
      setTotalFoods(data.allFoodCount);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const createCategory = async () => {
    if (!categgoryName.trim()) {
      toast.error("Enter a category name");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: categgoryName,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Category created");
      getCategory();
      setCategoryName("");
    } catch {
      toast.error("Failed to create category");
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      const res = await fetch("http://localhost:8000/category", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: categoryId,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Category deleted");
      getCategory();
    } catch {
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <main className="w-full max-w-310 max-h-full bg-gray-200 flex flex-col">
      <div className="w-full max-w-292 mx-auto">
        <div className="self-end">
          <Image
            src="/Admin.jpg"
            alt="Admin"
            width={40}
            height={40}
            className="rounded-2xl mt-6"
          />
        </div>
        <div className="flex flex-col h-44 mt-6 rounded-2xl bg-[#FFFFFF]">
          <div className="text-[#09090B] text-2xl font-semibold ml-6 mt-6">
            Dishes category
          </div>
          <div className="flex flex-wrap mt-2 ml-5 gap-2 items-center">
            <div className="px-4 py-2 border border-red-400 rounded-full">
              All dishes{" "}
              <span className="text-white bg-black rounded-full px-2.5 py-1 font-semibold text-sm">
                {totalFoods}
              </span>
            </div>
            {categories.map((category, index) => (
              <button
                key={index}
                className="border border-gray-400 text-sm text-black rounded-full flex items-center gap-2 font-medium py-2 px-4"
              >
                {category.categoryName}
                <div className="text-white bg-black rounded-full w-9 h-5">
                  {category.foodCount}
                </div>
                <div
                  onClick={() => deleteCategory(category._id)}
                  className=" border border-gray-600 rounded-full px-2 text-white bg-black"
                >
                  x
                </div>
              </button>
            ))}

            <Dialog>
              <DialogTrigger>
                <div className="flex items-center justify-center h-8 w-8 py-2 bg-[#EF4444] text-white text-2xl rounded-full  ">
                  +
                </div>
              </DialogTrigger>
              <DialogContent className="max-h-66 h-full max-w-115 w-full">
                <DialogHeader>
                  <DialogTitle className="text-[#09090B] text-3xl font-semibold ">
                    Add new category
                  </DialogTitle>
                  <DialogDescription className="mt-6 text-[#09090B] text-lg">
                    Category name
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col">
                  <input
                    onChange={(e) => setCategoryName(e.target.value)}
                    value={categgoryName}
                    placeholder="Type category name"
                    className="w-full h-11"
                  />
                  <button
                    onClick={() => createCategory()}
                    className="flex justify-center w-30 h-5 mt-4 rounded bg-[#18181B] text-[#FAFAFA] text-sm "
                  >
                    Add new category
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex flex-col flex-wrap">
          {categories.map((category) => {
            return (
              <AdminFoodList
                key={category._id}
                category={category}
                getCategory={() => getCategory()}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};
