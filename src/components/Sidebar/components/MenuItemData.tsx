"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { RightArrowIconSVG } from "@/utils/SVGs/SVGs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItemData = memo((props: any) => {
  const {
    label,
    href,
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
        <div
          className={`flex items-center p-2 rounded  transition-all ${
            isActive
              ? "bg-white text-green-800"
              : "hover:bg-gray-50 hover:text-green-800"
          } ${isCollapsed ? "flex-col" : "gap-3 text-base"}`}
        >
          {isCollapsed && (
            <div className="flex flex-col text-[0.8rem] text-center">
              <span className="flex justify-center">{icon}</span>{" "}
              <span>{label}</span>
            </div>
          )}
          {!isCollapsed && (
            <div className="flex gap-3 text-[0.9rem]">
              <span>{icon}</span> <span>{label}</span>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
});

export default MenuItemData;
