"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { RightArrowIconSVG } from "@/utils/SVGs/SVGs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const MenuItemData = memo((props: any) => {
  const {
    label,
    href,
    notificationData,
    submenuItems = [],
    isSidebarOpen,
    icon,
    isCollapsed,
  } = props;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = href === pathname;
  const menuItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const isInitialLoad = !localStorage.getItem("hasScrolled");
    if (isActive && menuItemRef.current && isInitialLoad) {
      menuItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      localStorage.setItem("hasScrolled", "true");
    }
  }, [isActive]);

  return (
    <li className="my-2">
      <Link href={href} className="hover:text-gray-400">
        <motion.div
          className={`flex items-center p-2 rounded transition-all 
    ${
      isActive
        ? "bg-gradient-to-r from-white to-green-100 text-green-800"
        : "hover:bg-gradient-to-r from-green-100 to-green-300 hover:text-green-800"
    } ${isCollapsed ? "flex-col" : "gap-3 text-base"}`}

          // className={`flex items-center p-2 rounded  transition-all ${
          //   isActive
          //     ? "bg-white text-green-800"
          //     : "hover:bg-gray-50 hover:text-green-800"
          // } ${isCollapsed ? "flex-col" : "gap-3 text-base"}`}
        >
          {isCollapsed && (
            <div className="flex flex-col text-[0.8rem] text-center relative">
              <span className="flex justify-center">{icon}</span>{" "}
              <span>{label}</span>
              {label === "Inbox" &&
                notificationData?.notifications?.some(
                  (notification: any) => !notification?.isRead
                ) && (
                  <div className="absolute top-0 left-3 h-4 w-4 rounded-full bg-red-600 flex justify-center items-center">
                    <span className="font-bold text-white text-[10px]">
                      {
                        notificationData?.notifications?.filter(
                          (notification: any) => !notification?.isRead
                        ).length
                      }
                    </span>
                  </div>
                )}
            </div>
          )}
          {!isCollapsed && (
            <div className="flex gap-3 text-[0.9rem] relative">
              <span className="w-[30px]">{icon}</span> <span>{label}</span>
              {/* {label === "Inbox" && (
                <div className="absolute top-0 left-3 h-4 w-4 rounded-full bg-red-600 flex justify-center items-center">
                  <span className="font-bold text-white text-[10px]">
                    {notificationData?.notifications?.filter(
                      (notification: any) => !notification?.isRead
                    )?.length || 0}
                  </span>
                </div>
              )} */}
              {label === "Inbox" &&
                notificationData?.notifications?.some(
                  (notification: any) => !notification?.isRead
                ) && (
                  <div className="absolute top-0 left-3 h-4 w-4 rounded-full bg-red-600 flex justify-center items-center">
                    <span className="font-bold text-white text-[10px]">
                      {
                        notificationData?.notifications?.filter(
                          (notification: any) => !notification?.isRead
                        ).length
                      }
                    </span>
                  </div>
                )}
            </div>
          )}
        </motion.div>
      </Link>
    </li>
  );
});

export default MenuItemData;
