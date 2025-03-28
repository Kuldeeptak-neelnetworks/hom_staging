"use client";

import { Suspense, useState } from "react";
import SideBar from "./SideBar";
import { usePathname } from "next/navigation";

export default function SideBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const pathname = usePathname();

  return (
    <div className="flex">
      {/* Sidebar */}
      {pathname.startsWith("/auth") || pathname === "/" ? (
        ""
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <SideBar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </Suspense>
      )}

      {/* Main content with dynamic width */}
      <main
        className={`transition-all duration-300 flex-1 pl-5 pt-8 overflow-hidden ${
          isCollapsed ? "ml-[2rem]" : "ml-[10rem]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
