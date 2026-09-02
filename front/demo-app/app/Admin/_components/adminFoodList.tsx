"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImagePlus, Plus } from "lucide-react";
import { AdminFoodCard } from "./adminFoodCard";
import { CategoryType } from "./foodMenu";

const UPLOAD_PRESET = "ml_default";
const CLOUD_NAME = "tmnqu3q8";

export const AdminFoodList = ({
  category,
  getCategory,
}: {
  category: CategoryType;
  getCategory: () => void;
}) => {
  const [foods, setFoods] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodIngredients, setFoodIngredients] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const getFoods = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/category/${category._id}`,
      );
      const data = await response.json();
      setFoods(data.foods);
    } catch {
      toast.error("Failed to load foods");
    }
  };

  const createFood = async () => {
    if (!foodName.trim()) {
      toast.error("Enter a food name");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodName: foodName,
          image: imgUrl,
          ingredients: foodIngredients,
          price: foodPrice,
          category: category._id,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Food created");
      setFoodName("");
      setFoodPrice("");
      setFoodIngredients("");
      setImgUrl("");
      getCategory();
      getFoods();
    } catch {
      toast.error("Failed to create food");
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

        {
          method: "POST",

          body: formData,
        },
      );
      const data = await response.json();
      if (!data.secure_url) throw new Error();
      return data.secure_url;
    } catch (error) {
      toast.error("Image upload failed");
      throw error;
    }
  };

  const handleImgUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setImgUrl(url);
      toast.success("Image uploaded");
    } catch {
      // toast already shown
    }
    setUploading(false);
  };

  useEffect(() => {
    getFoods();
  }, []);
  return (
    <section className="mt-6 p-5 bg-white rounded-lg w-full ">
      <div className="mb-4 flex items-center gap-2 uppercase">
        <h1 className="text-2xl font-semibold tracking-tight">
          {category.categoryName}
        </h1>
        <span className="flex h-5 min-w-5 items-center justify-center text-xl font-medium ">
          ({category.foodCount})
        </span>
      </div>

      <div className="flex flex-wrap gap-4 ">
        <Dialog>
          <DialogTrigger className="group w-67.5 h-60 flex aspect-3/4 flex-col items-center justify-center rounded-2xl border border-dashed border-[#EF4444]  transition hover:border-red-400 hover:bg-red-50">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#EF4444] text-white shadow-sm transition group-hover:scale-105">
              <Plus className="size-5" />
            </div>
            <p className="text-sm font-medium mt-3">
              Add new Dish to {category.categoryName}
            </p>
          </DialogTrigger>
          <DialogContent className="max-h-150 h-full w-150 max-w-[full] sm:max-w-150">
            <DialogHeader>
              <DialogTitle className="text-[#09090B] text-xl font-semibold ">
                Add {category.categoryName}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-2 text-[#09090B] text-lg flex flex-col">
              <div className="flex mt-3 gap-2">
                <div className="font-medium">
                  Food name
                  <input
                    className="border-2 rounded-lg"
                    type="text"
                    placeholder="Food name"
                    onChange={(e) => setFoodName(e.target.value)}
                    value={foodName}
                  />
                </div>
                <div className="font-medium">
                  Food Price
                  <input
                    className="border-2 rounded-lg"
                    type="number"
                    placeholder="Enter price"
                    onChange={(e) => setFoodPrice(e.target.value)}
                    value={foodPrice}
                  />
                </div>
              </div>
              <div className="flex flex-col font-medium mt-6 ">
                Ingredients
                <textarea
                  className="border-2 rounded-lg h-22 placeholder:flex justify-start"
                  placeholder="Ingredients"
                  onChange={(e) => setFoodIngredients(e.target.value)}
                  value={foodIngredients}
                />
              </div>
              <div className="flex flex-col mt-6">
                Food Image
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt="Food Image"
                    className="h-40 w-full rounded-xl object-cover"
                  />
                ) : uploading ? (
                  <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 text-neutral-500 text-sm">
                    Uploading...
                  </div>
                ) : (
                  <label
                    className="flex flex-col items-center
                        justify-center rounded-2xl border border-dashed border-neutral-500 bg-[#2563EB0D] h-45 hover:border-neutral-400 hover:bg-neutral-100"
                  >
                    <ImagePlus className="mb-2 size-6" />
                    <span className="text-sm font-medium">Upload image</span>
                    <input
                      className="hidden"
                      type="file"
                      placeholder="Food Image"
                      onChange={handleImgUpload}
                    />
                  </label>
                )}
              </div>

              <Button
                className="mt-4 w-20 h-10 bg-[#18181B] rounded-lg text-[#FAFAFA] self-end"
                onClick={createFood}
                disabled={uploading}
              >
                Add Dish
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {foods.map((food: any) => {
          return <AdminFoodCard key={food._id} food={food} />;
        })}
      </div>
    </section>
  );
};
