import { CalendarIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import User from "../../../asset/images/user.png";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
const UserPic = User.src;

export function WebsitelargeDataHoverBox({ data }: any) {
  const truncatedText = data ? `${data.slice(0, 10)}...` : "N/A";
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {truncatedText !== "N/A" ? (
          <div className="text-nowrap cursor-pointer hover:text-green-800 hover:font-bold">
            {truncatedText}
          </div>
        ) : (
          <div className="text-nowrap text-gray-300">{truncatedText}</div>
        )}
      </HoverCardTrigger>
      <HoverCardContent className="w-[800px] text-wrap">
        <div className="flex justify-between space-x-4 ">
          <div className="space-y-1">
            <p className="text-sm  text-white">{data || "N/A"}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
