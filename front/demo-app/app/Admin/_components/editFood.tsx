"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FoodType } from "./adminFoodCard";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CategoryType } from "./foodMenu";

const UPLOAD_PRESET = "ml_default";
const CLOUD_NAME = "tmnqu3q8";

export const EditFood = ({ food }: { food: FoodType }) => {
  const [editingFood, setEditingFood] = useState(food.foodName);
  const [ingredients, setIngredients] = useState(food.ingredients);
  const [price, setPrice] = useState(food.price);
  const [editCategory, setEditCategory] = useState(food.category._id);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [imgUrl, setImgUrl] = useState(food.image);
  const [uploading, setUploading] = useState(false);

  const getCategory = async () => {
    try {
      const res = await fetch("http://localhost:8000/category");
      const data = await res.json();
      setCategories(data.categories);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const editFood = async () => {
    try {
      const res = await fetch("http://localhost:8000/food", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: food._id,
          foodName: editingFood,
          ingredients: ingredients,
          price: price,
          category: editCategory,
          image: imgUrl,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Food updated");
    } catch {
      toast.error("Failed to update food");
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
      if (url) {
        setImgUrl(url);
        toast.success("Image uploaded");
      }
    } catch {
      // toast already shown
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  return (
    <Dialog>
      <DialogTrigger className="w-9 h-9 bg-white rounded-full absolute z-10 top-20 left-44 flex items-center justify-center">
        +
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col w-full max-h-150 overflow-y-auto bg-white rounded-lg gap-3 ">
          <div className="font-bold text-2xl">Dishes info</div>
          <div className="flex gap-4 py-3 h-15">
            <div className="w-30 text-xs text-gray-400">Dish name</div>
            <Input
              value={editingFood}
              onChange={(event) => setEditingFood(event?.target.value)}
            />
          </div>
          <div className="flex gap-4 py-3 h-15">
            <div className="w-30 text-xs text-gray-400">Dish category</div>
            <Select
              value={editCategory}
              onValueChange={(value) => setEditCategory(value as string)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category">
                  {(value: string) =>
                    categories.find((item) => item._id === value)
                      ?.categoryName ?? food.category.categoryName
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((item) => (
                    <SelectItem key={item._id} value={item._id}>
                      {item.categoryName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4 py-3 h-15">
            <div className="w-30 text-xs text-gray-400">Ingredients</div>
            <Textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </div>
          <div className="flex gap-4 py-3 h-15">
            <div className="w-30 text-xs text-gray-400">Price</div>
            <Input
              value={price}
              type="number"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="flex gap-4 py-3">
            <div className="w-30 text-xs text-gray-400">Image</div>
            <div className="flex w-full flex-col gap-2">
              {uploading ? (
                <p className="text-sm text-gray-400">Uploading...</p>
              ) : (
                imgUrl && (
                  <img
                    src={imgUrl}
                    alt={editingFood}
                    className="h-32 w-full rounded-lg object-cover"
                  />
                )
              )}
              <Input type="file" onChange={handleImgUpload} />
            </div>
          </div>

          <div className="flex justify-between">
            <div>DEL</div>
            <div
              className="bg-black text-white px-4 py-2.5 rounded-lg"
              onClick={() => editFood()}
            >
              Save Changes
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};