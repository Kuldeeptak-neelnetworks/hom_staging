"use client";
import SideBarContent from "@/components/Sidebar/SideBarContent";
import TechnicalTrackerDetailsContent from "@/components/TechnicalTracker/components/TechnicalTrackerDetailsContent";

import React, { useEffect, useState } from "react";

const TechnicalDetailsPage = () => {
  const [toggleWidth, setToggleWidth] = useState<boolean>(false);
  return (
    <div className="col-span-6">
      {/* <div>
        <SideBarContent setToggleWidth={setToggleWidth} />
      </div> */}
      <div
        className={`sm:px-2 p-0 sm:ml-[2rem] ml-0 transition-all duration-300  bg-[#f2f6fa] min-h-[95vh] `}
        // className={`${
        //   toggleWidth ? "sm:ml-64  ml-0" : "sm:ml-20 ml-0"
        // } sm:px-4 p-0 transition-all duration-300 bg-[#f2f6fa] min-h-[95vh]`}
      >
        <div className=" dark:border-gray-700">
          <TechnicalTrackerDetailsContent />
        </div>
      </div>
    </div>
  );
};

export default TechnicalDetailsPage;
