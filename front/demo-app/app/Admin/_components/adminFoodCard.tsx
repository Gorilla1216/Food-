import { EditFood } from "./editFood";
import { CategoryType } from "./foodMenu";
import Image from "next/image";

export type FoodType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  _id: string;
  category: CategoryType;
};
export const AdminFoodCard = ({ food }: { food: FoodType }) => {
  return (
    <div
      key={food._id}
      className="h-60 max-w-67 w-full flex flex-col items-center justify-center outline-2 outline-[#E4E4E7] rounded-2xl"
    >
      <div className="h-40 max-w-58 w-full relative overflow-hidden rounded-2xl">
        {food?.image ? (
          <img
            src={food?.image}
            alt={food.foodName || "Food image"}
            className="object-cover"
          />
        ) : (
          <div className="flex h-35 w-60 items-center justify-center text-sm">
            No Image
          </div>
        )}

        <EditFood food={food} />
      </div>

      <div className="">
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-2 ">
            <span className="text-base text-[#EF4444] font-medium">
              {food.foodName}
            </span>
            <span className="text-sm text-[#09090B] font-normal ">
              {food.price}
            </span>
          </div>
          <div>
            <span className="flex text-sm text-[#09090B] font-normal text-center items-center">
              {food.ingredients}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
