"use client";
import { useEffect, useState } from "react";

type CategoryType = {
  categoryName: String;
  _id: String;
};

import { Button } from "@base-ui/react";
import { HandPlatter } from "lucide-react";
import { TextAlignJustify } from "lucide-react";
import { Truck } from "lucide-react";
import Image from "next/image";
import { json } from "stream/consumers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const getCategory = async () => {
    const res = await fetch("http://localhost:8000/category");
    const data = await res.json();
    setCategories(data);
  };

  const createCategory = async () => {
    const res = await fetch("http://localhost:8000/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        categoryName: categoryName,
      }),
    });
    getCategory();
    setCategoryName("");
  };

  const deleteCategory = async(categoryId) => {
    const res = await fetch("http://localhost:8000/category", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: categoryId,
      }),
    });
    getCategory();
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="w-full h-screen max-h-full max-w-360 flex flex-row bg-gray-200">
      <div className="w-full max-h-full max-w-50 bg-[#FFFFFF] justify-center">
        <div className="flex flex-col mt-10 items-center justify-center place-content-center">
          <div className="flex flex-row gap-2">
            <HandPlatter size={36} className="text-[#EF4444] mt-2" />
            <div>
              <span className="text-xl font-bold text-[#09090B]">NomNom</span>
              <p className="text-lg font-semibold text-[#71717A]">
                Swift delivery
              </p>
            </div>
          </div>
          <div className="flex flex-row mt-10 gap-2 items-center">
            <TextAlignJustify />
            <span className="text-lg font-medium text-[#09090B] items-center">
              Food menu
            </span>
          </div>
          <div className="items-center">
            <Button className="flex flex-row mt-6 rounded-2xl w-38 h-10 text-[#FAFAFA] bg-black gap-2 justify-center">
              <Truck className="mt-2 " />
              <span className="mt-2 text-base">Orders</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full max-h-full max-w-310 flex flex-col">
        <div className="w-full max-w-292 mx-auto">
          <Image
            src="/Admin.jpg"
            alt="Admin"
            width={40}
            height={40}
            className="rounded-2xl mt-6 flex place-content-end"
          />
          <div className="flex flex-col h-44 mt-6 rounded-2xl bg-[#FFFFFF]">
            <div className="text-[#09090B] text-2xl font-semibold ml-6 mt-6">
              Dishes category
            </div>
            <div className="flex flex-wrap mt-2 ml-5 gap-2 items-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="border border-gray-400 text-sm text-black rounded-full flex items-center gap-2 font-medium py-2 px-3"
                >
                  {category.categoryName}
                  <div className="text-white bg-black rounded-full w-9 h-5">
                    20
                  </div>
                  <div onClick={() => deleteCategory(category._id)} className=" border border-gray-600 rounded-full px-2 text-white bg-black">x</div>
                </button>
              ))}

              <Dialog>
                <DialogTrigger>
                  <div className="flex items-center justify-center h-8 w-8 bg-[#EF4444] text-white text-2xl rounded-full ">
                    +
                  </div>
                </DialogTrigger>
                <DialogContent className="max-h-68 h-full max-w-115 w-full">
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
                      value={categoryName}
                      placeholder="Type category name"
                      className="w-full h-11"
                    />
                    <button onClick={() => createCategory()} className="flex justify-center w-30 h-5 mt-4 rounded bg-[#18181B] text-[#FAFAFA] text-sm ">
                      Add new category
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          {/* <div className="w-full max-w-292 h-screen mx-auto mt-6 flex flex-row">
            <div className="w-full max-w-292 h-19 flex flex-row bg-[#FFFFFF] justify-between rounded-lg">
              <div className="w-full max-w-50 ml-4 mt-3">
                <span className="text-xl font-bold text-[#09090B]">Orders</span>
                <p className="text-base font-medium text-[#71717A]">1 items</p>
              </div>
              <div className="flex flex-row gap-4">
                <div className="">Date</div>
                <div>Delivery status</div>
              </div>
            </div>
            <div className="mt-4">
              <input type="checkbox" name="" id="" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
