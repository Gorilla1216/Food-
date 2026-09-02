"use client";

import { FoodMenu } from "./_components/foodMenu";
import Link from "next/link";
import { Button } from "@base-ui/react";
import { HandPlatter } from "lucide-react";
import { TextAlignJustify } from "lucide-react";
import { Truck } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="w-full mx-auto max-w-360 flex flex-row h-full">
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
            <Link
              href="/food-menu"
              className="flex text-center justify-center text-lg rounded-2xl font-medium text-[#FAFAFA] bg-black items-center w-38 h-10"
            >
              <TextAlignJustify />
              Food menu
            </Link>
          </div>
          <div className="items-center">
            <Button className="flex flex-row mt-4 w-38 h-10 text-[#09090B] gap-2 justify-center">
              <Truck className="mt-2 " />
              <span className="mt-2 text-base">Orders</span>
            </Button>
          </div>
        </div>
      </div>
      <FoodMenu />
    </div>
  );
}