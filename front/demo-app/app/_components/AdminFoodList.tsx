"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryType } from "../Admin/page";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImagePlus } from "lucide-react";
const UPLOAD_PRESET = "Food-delivery";
const CLOUD_NAME = "lljfl4xt";

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
        image: imgUrl,
        ingredients: foodIngredients,
        price: foodPrice,
        category: category._id,
      }),
    });
    getCategory();
    getFoods();
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
      console.log(data);
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
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
    } catch (err) {
      console.log("Failed to upload logo: " + err);
    } finally {
      setUploading(false);
    }
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
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt="Food Image"
                          className="h-40 w-full rounded-xl object-cover"
                        />
                      ) : uploading ? (
                        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-neutral-200 bg-neutral-50 text-neutral-500 text-sm">
                          Uploading...
                        </div>
                      ) : (
                        <label
                          className="flex flex-col items-center
                        justify-center border border-dashed border-neutral-500 bg-[#2563EB0D] h-45"
                        >
                          <ImagePlus className="mb-2 size-6" />
                          <span className="text-base font-medium">
                            Upload image
                          </span>
                          <input
                            className="hidden"
                            type="file"
                            placeholder="Food Image"
                            onChange={handleImgUpload}
                          />
                        </label>
                      )}
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
              <div
                key={food._id}
                className="max-h-60 h-full max-w-67 w-full flex flex-col items-center justify-center outline-2 outline-[#E4E4E7] rounded-2xl"
              >
                <div className="max-h-33 h-full max-w-58 w-full relative overflow-hidden rounded-2xl ">
                  {food?.image ? (
                    <Image
                      src={food?.image.trim()}
                      alt={food.foodName || "Food image"}
                      width={240}
                      height={130}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm">
                      No Image
                    </div>
                  )}

                </div>
                <div className="flex justify-between w-full px-4 mt-2">
                  <span className="text-base text-[#EF4444] font-medium">
                    {food.foodName}{" "}
                  </span>
                  <span className="text-sm text-[#09090B] font-normal">
                    {" "}
                    {food.price}
                  </span>
                </div>
                <div>
                  <span className="flex text-sm text-[#09090B] font-normal text-center items-center">
                    {food.ingredients}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// "use client";
// import { useEffect, useState } from "react";

// import { AdminFoodList } from "../_components/AdminFoodList";
// import { Button } from "@base-ui/react";
// import { HandPlatter } from "lucide-react";
// import { TextAlignJustify } from "lucide-react";
// import { Truck } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { json } from "stream/consumers";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { OrdersTable } from "../_components/OrderTable";
// export type CategoryType = {
//   categoryName: String;
//   _id: string;
//   foodCount: number;
// };

// export default function AdminPage() {
//   const [categories, setCategories] = useState<CategoryType[]>([]);
//   const [categoryName, setCategoryName] = useState("");
//   const [totalFoods, setTotalFoods] = useState(0);
//   const getCategory = async () => {
//     const res = await fetch("http://localhost:8000/category");
//     const data = await res.json();
//     setCategories(data.categories);
//     setTotalFoods(data.allFoodCount);
//   };

//   const createCategory = async () => {
//     const res = await fetch("http://localhost:8000/category", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         categoryName: categoryName,
//       }),
//     });
//     getCategory();
//     setCategoryName("");
//   };

//   const deleteCategory = async (categoryId: string) => {
//     const res = await fetch("http://localhost:8000/category", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id: categoryId,
//       }),
//     });
//     getCategory();
//   };

//   useEffect(() => {
//     getCategory();
//   }, []);

//   return (
//     <div className="w-full mx-auto max-w-360 flex flex-row h-full">
//       <div className="w-full max-h-full max-w-50 bg-[#FFFFFF] justify-center">
//         <div className="flex flex-col mt-10 items-center justify-center place-content-center">
//           <div className="flex flex-row gap-2">
//             <HandPlatter size={36} className="text-[#EF4444] mt-2" />
//             <div>
//               <span className="text-xl font-bold text-[#09090B]">NomNom</span>
//               <p className="text-lg font-semibold text-[#71717A]">
//                 Swift delivery
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-row mt-10 gap-2 items-center">
//             <Link
//               href="/food-menu"
//               className="flex text-center justify-center text-lg rounded-2xl font-medium text-[#FAFAFA] bg-black items-center w-38 h-10"
//             >
//               <TextAlignJustify />
//               Food menu
//             </Link>
//           </div>
//           <div className="items-center">
//             <Button className="flex flex-row mt-4 w-38 h-10 text-[#09090B] gap-2 justify-center">
//               <Truck className="mt-2 " />
//               <span className="mt-2 text-base">Orders</span>
//             </Button>
//           </div>
//         </div>
//       </div>
//       <div className="w-full max-w-310 max-h-full bg-gray-200 flex flex-col ">
//         <div className="w-full max-w-292 mx-auto">
//           <Image
//             src="/Admin.jpg"
//             alt="Admin"
//             width={40}
//             height={40}
//             className="rounded-2xl mt-6 flex place-content-end"
//           />
//           <div className="flex flex-col h-44 mt-6 rounded-2xl bg-[#FFFFFF]">
//             <div className="text-[#09090B] text-2xl font-semibold ml-6 mt-6">
//               Dishes category <span>{totalFoods}</span>
//             </div>
//             <div className="flex flex-wrap mt-2 ml-5 gap-2 items-center">
//               {categories.map((category, index) => (
//                 <button
//                   key={index}
//                   className="border border-gray-400 text-sm text-black rounded-full flex items-center gap-2 font-medium py-2 px-3"
//                 >
//                   {category.categoryName}
//                   <div className="text-white bg-black rounded-full w-9 h-5">
//                     {category.foodCount}
//                   </div>
//                   <div
//                     onClick={() => deleteCategory(category._id)}
//                     className=" border border-gray-600 rounded-full px-2 text-white bg-black"
//                   >
//                     x
//                   </div>
//                 </button>
//               ))}

//               <Dialog>
//                 <DialogTrigger>
//                   <div className="flex items-center justify-center h-8 w-8 bg-[#EF4444] text-white text-2xl rounded-full ">
//                     +
//                   </div>
//                 </DialogTrigger>
//                 <DialogContent className="max-h-66 h-full max-w-115 w-full">
//                   <DialogHeader>
//                     <DialogTitle className="text-[#09090B] text-3xl font-semibold ">
//                       Add new category
//                     </DialogTitle>
//                     <DialogDescription className="mt-6 text-[#09090B] text-lg">
//                       Category name
//                     </DialogDescription>
//                   </DialogHeader>
//                   <div className="flex flex-col">
//                     <input
//                       onChange={(e) => setCategoryName(e.target.value)}
//                       value={categoryName}
//                       placeholder="Type category name"
//                       className="w-full h-11"
//                     />
//                     <button
//                       onClick={() => createCategory()}
//                       className="flex justify-center w-30 h-5 mt-4 rounded bg-[#18181B] text-[#FAFAFA] text-sm "
//                     >
//                       Add new category
//                     </button>
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//           <div className="flex flex-col flex-wrap">
//             {categories.map((category: any) => {
//               return <AdminFoodList key={category._id} category={category} getCategory={() => getCategory()}/>;
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
