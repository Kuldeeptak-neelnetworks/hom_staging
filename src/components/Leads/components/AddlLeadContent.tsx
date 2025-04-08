"use client";
import React from "react";
import AddLeadForm from "./AddLeadsForm";
import Link from "next/link";
import { motion } from "framer-motion";

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
      <motion.div
        className=" flex gap-5 justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="my-6 text-[0.8rem] bg-[#fff] hover:bg-gray-300 h-fit px-2 py-1  cursor-pointer hidden text-center sm:block w-fit boxShadow ">
          <Link href={`/leads`}>Back</Link>
        </div>
        <AddLeadForm />
      </motion.div>
    </div>
  );
};

export default AddLeadContent;
