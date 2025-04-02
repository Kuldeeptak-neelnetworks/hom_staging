"use client";
import React from "react";
import AddLeadForm from "./AddLeadsForm";
import Link from "next/link";

const crumbs = [
  {
    id: 1,
    title: "Home",
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Users",
    link: "/users",
  },
  {
    id: 3,
    title: "Edit User Details",
    link: "",
  },
];

const AddLeadContent = () => {
  return (
    <div className="px-4 py-0 relative">
      <div className="text-md font-semibold absolute top-[-30px]">New Lead</div>
      {/* <div className="mb-4">
        <BreadcrumbSection crumbs={crumbs} />
      </div> */}
      <div className=" flex gap-5 justify-center">
        <div className="my-6 text-[0.8rem] bg-[#fff] hover:bg-gray-300 h-fit px-2 py-1  cursor-pointer hidden text-center sm:block w-fit boxShadow ">
          <Link href={`/leads`}>Back</Link>
        </div>
        <AddLeadForm />
      </div>
    </div>
  );
};

export default AddLeadContent;
