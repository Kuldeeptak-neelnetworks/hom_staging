"use client";

import { useState } from "react";
import SideBar from "./SideBar";
import { usePathname } from "next/navigation";

export default function SideBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const pathname = usePathname();
  console.log("pathname", pathname);

  return (
    <div className="flex">
      {/* Sidebar */}
      {pathname.startsWith("/auth") ? (
        ""
      ) : (
        <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      )}

      {/* Main content with dynamic width */}
      <main
        className={`transition-all duration-300 flex-1 pl-5 py-8 overflow-hidden ${
          isCollapsed ? "ml-[2rem]" : "ml-[10rem]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
