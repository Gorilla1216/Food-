import { Button } from "@base-ui/react";
import { HandPlatter } from "lucide-react";
import { TextAlignJustify } from "lucide-react";
import { Truck } from "lucide-react";
import Image from "next/image";

export default function AdminPage() {
  return (
    <div className="w-full max-h-full max-w-360 mx-auto flex flex-row bg-gray-200">
      <div className="w-full max-h-full max-w-50 bg-[#FFFFFF] justify-center">
        <div className="flex flex-col mt-10">
          <div className="flex flex-row gap-2">
            <HandPlatter size={36} className="text-[#EF4444] mt-2" />
            <div>
              <span className="text-xl font-bold text-[#09090B]">NomNom</span>
              <p className="text-lg font-semibold text-[#71717A]">
                Swift delivery
              </p>
            </div>
          </div>
          <div className="flex flex-row mt-10 gap-2">
            <TextAlignJustify />
            <span className="text-lg font-medium text-[#09090B] justify-center">
              Food menu
            </span>
          </div>
          <div className="mr-10">
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
          <div className="w-full max-w-292 h-screen mx-auto mt-6 flex flex-row">
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
          </div>
        </div>
      </div>
    </div>
  );
}
