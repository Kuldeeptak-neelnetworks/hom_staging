"use client";

import SideBarContent from "@/components/Sidebar/SideBarContent";
import AddUserContent from "@/components/Users/components/AddUserContent";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const AddUserPage = () => {
  // const searchParams = useSearchParams();
  // const role = searchParams.get("setIsUpdated");

  return (
    <div className="col-span-6">
      {/* <div>
        <SideBarContent setToggleWidth={setToggleWidth} />
      </div> */}
      <div
        // className={`${
        //   toggleWidth ? "sm:ml-20 ml-0" : "sm:ml-64  ml-0"
        // } sm:px-4 p-0 transition-all duration-300`}
        // className={`${
        //   toggleWidth ? "sm:ml-64 ml-0" : "sm:ml-20 ml-0"
        // } sm:px-4 p-0 transition-all duration-300 bg-[#f2f6fa] min-h-[95vh] `}
        className={`sm:px-2 p-0 sm:ml-[2rem] ml-0 transition-all duration-300  bg-[#0ba09817] min-h-[95vh] `}
      >
        <div className=" dark:border-gray-700">
          <AddUserContent />
        </div>
      </div>
    </div>
  );
};

export default AddUserPage;
