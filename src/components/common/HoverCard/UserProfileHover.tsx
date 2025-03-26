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

export function UserProfileHover({ picture, designation, name }: any) {
  console.log("name", name);
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar>
          <AvatarImage src={picture} className="" />
          <AvatarFallback>
            <img src={UserPic} className="" />
          </AvatarFallback>
        </Avatar>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit">
        <div className="flex justify-between space-x-4 ">
          <Avatar className="h-12 w-12">
            <AvatarImage src={picture} />
            <img src={UserPic} className="" />
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-white">
              {name || "User"}
            </h4>
            <p className="text-sm  text-white">
              {designation || "No role available."}
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
