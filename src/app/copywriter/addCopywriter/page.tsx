"use client";
import AddCopywriterForm from "@/components/CopywriterTracker/components/AddCopywriterForm";
import SideBarContent from "@/components/Sidebar/SideBarContent";
import React, { Suspense, useState } from "react";

const AddCopywriterFormPage: React.FC = () => {
  const [toggleWidth, setToggleWidth] = useState<boolean>(false);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="col-span-6">
        {/* <div>
        <SideBarContent setToggleWidth={setToggleWidth} />
      </div> */}
        <div
          // className={
          //   toggleWidth
          //     ? `sm:p-4 p-0 sm:ml-64 ml-0  transition-all duration-300 bg-[#f2f6fa] min-h-[95vh] `
          //     : ` sm:p-4 p-0 sm:ml-20 ml-0 transition-all duration-300 bg-[#f2f6fa] min-h-[95vh] `
          // }
          className={`sm:px-2 p-0 sm:ml-[2rem] ml-0 transition-all duration-300  bg-[#0ba09817] min-h-[95vh] `}
        >
          <div className=" dark:border-gray-700">
            <AddCopywriterForm />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default AddCopywriterFormPage;
