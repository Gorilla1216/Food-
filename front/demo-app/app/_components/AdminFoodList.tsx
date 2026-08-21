import { CategoryType } from "../Admin/page";

export const AdminFoodList = ({ category }: { category: CategoryType }) => {
  return (
    <div className="flex flex-col flex-wrap mt-2 gap-2 bg-[#FFFFFF] rounded-2xl">
      <h1 className="text-2xl font-semibold tracking-tight ml-6">
        {category.categoryName} <span>{category.foodCount}</span>
      </h1>
      <div className="grid grid-cols-4 gap-4 ml-6">
        <div className="">

        </div>
      </div>
    </div>
  );
};
