"use client";

import React, { useState } from "react";
import SideBarContent from "@/components/Sidebar/SideBarContent";
import dynamic from "next/dynamic";
// import AppointmentContent from "@/components/Leads/appointment/AppointmentContent";
const AppointmentContent = dynamic(
  () => import("@/components/Leads/appointment/AppointmentContent"),
  { ssr: false }
);

const AppointmentPage = () => {
  const [toggleWidth, setToggleWidth] = useState<boolean>(false);
  return (
    <div className="col-span-6">
      {/* <div>
        <SideBarContent setToggleWidth={setToggleWidth} />
      </div> */}
      <div
        // className={
        //   toggleWidth
        //     ? `sm:px-4 p-0 sm:ml-20 ml-0 transition-all duration-300`
        //     : `sm:px-4 p-0 sm:ml-64 ml-0 transition-all duration-300`
        // }
        // className={
        //   toggleWidth
        //     ? `sm:px-4 p-0 sm:ml-64 ml-0 transition-all duration-300`
        //     : `sm:px-4 p-0 sm:ml-20 ml-0 transition-all duration-300`
        // }
        className={`sm:px-2 p-0 sm:ml-[2rem] ml-0 transition-all duration-300  bg-[#0ba09817] min-h-[95vh] `}
      >
        <div className=" dark:border-gray-700">
          <AppointmentContent />
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
