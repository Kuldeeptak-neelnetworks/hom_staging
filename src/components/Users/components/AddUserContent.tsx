"use client";
import React from "react";

import AddUserForm from "./AddUserForm";
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

const AddUserContent = () => {
  return (
    <div className="px-4 my-1 relative">
      <div className="text-md font-semibold absolute top-[-30px]">Add User</div>
      {/* <div className="mb-4">
        <BreadcrumbSection crumbs={crumbs} />
      </div> */}
      <motion.div
        initial={{ opacity: 0, x: -50, rotate: -5, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className=" flex gap-5 justify-center"
      >
        <AddUserForm />
      </motion.div>
    </div>
  );
};

export default AddUserContent;
