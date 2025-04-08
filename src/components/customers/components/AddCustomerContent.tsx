"use client";
import React from "react";
import AddCustomerForm from "./AddCustomerForm";
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

const AddCustomerContent = () => {
  return (
    <div className="px-4 py-0 relative">
      <div className="text-md font-semibold absolute top-[-30px]">
        Add Customer
      </div>
      {/* <div className="mb-4">
        <BreadcrumbSection crumbs={crumbs} />
      </div> */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className=" flex gap-5 justify-center "
      >
        <AddCustomerForm />
      </motion.div>
    </div>
  );
};

export default AddCustomerContent;
