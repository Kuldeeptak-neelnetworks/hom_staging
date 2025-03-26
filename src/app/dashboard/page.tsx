"use client";
import SideBarContent from "@/components/Sidebar/SideBarContent";
import React, { useEffect, useState } from "react";
import { AxiosError, all } from "axios";

import {
  baseInstance,
  formatDate,
  getUserData,
  headerOptions,
  logOutFunction,
} from "../../common/commonFunctions";
import {
  CustomersIconSVG,
  LatestAmendmentsUIconSVG,
  LatestLeadsUIconSVG,
  LatestOrdersUIconSVG,
  LoaderIconSVG,
  UserIconSVG,
} from "@/utils/SVGs/SVGs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import errorMap from "zod/locales/en.js";
import BreadcrumbSection from "@/components/common/BreadcrumbSection";
import { useCustomerStore } from "@/Store/CustomerStore";
import { useLeadStore } from "@/Store/LeadStore";
import { useUserStore } from "@/Store/UserStore";
import { useOrderStore } from "@/Store/OrderStore";
import { useAmendmentStore } from "@/Store/AmendmentStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useSalesStore } from "@/Store/SalesStore";
import { motion } from "framer-motion";

const DashBoardPage: React.FC = () => {
  const { fetchAmendmentData, amendmentData }: any = useAmendmentStore();
  const { fetchAllLeadData, leadData }: any = useLeadStore();
  const { fetchAllOrdersData, orderData }: any = useOrderStore();
  const { fetchAllCustomerData, customerData }: any = useCustomerStore();
  const { fetchSalesData, SalesData }: any = useSalesStore();
  const {
    fetchUsersData,
    userData,
    userTotalOrderData,
    fetchUsersToatlOrders,
  }: any = useUserStore();

  const router = useRouter();
  const [toggleWidth, setToggleWidth] = useState<boolean>(false);
  const [allLeads, setAllLeads] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [allAmendments, setAllAmendments] = useState<any[]>([]);
  const [orderYear, setOrderYear] = useState<any>("");

  let userDetails: any =
    typeof window !== "undefined" ? localStorage?.getItem("user") : null;

  let userRole = JSON.parse(userDetails)?.role;

  useEffect(() => {
    setAllLeads(leadData?.leads && leadData?.leads ? leadData?.leads : []);
    setAllOrders(orderData?.orders ? orderData?.orders : []);
    setAllAmendments(
      amendmentData?.amendments ? amendmentData?.amendments : []
    );
  }, [leadData?.leads, orderData, amendmentData]);

  // ===========================================================
  const blockData = (data: any[]) => [...data].reverse().slice(0, 5);

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    setOrderYear(year);
  }, []);

  useEffect(() => {
    orderYear && fetchSalesData(orderYear);
  }, [orderYear]);

  useEffect(() => {
    fetchAllLeadData();
    fetchAllOrdersData(1, 20);
    fetchAmendmentData(1, 20);
    fetchAllCustomerData(1, 20);
    fetchUsersToatlOrders();
    userRole === "salesman" ? "" : fetchUsersData();
  }, []);

  useEffect(() => {
    if (
      allLeads === undefined ||
      leadData === "Invalid refresh token" ||
      leadData === "User not found" ||
      leadData === "Invalid User Access Token" ||
      leadData === "Invalid access token" ||
      leadData === "Unauthorized request: No access or refresh token"
    ) {
      router.push("/auth/login");
    }
  }, [allLeads, leadData]);

  return (
    <div className="col-span-6">
      {/* <div>
        <SideBarContent setToggleWidth={setToggleWidth} />
      </div> */}
      <div>
        <div
          // className={
          //   toggleWidth
          //     ? `sm:px-4 sm:ml-[14rem] ml-0 bg-[#edf0f5] transition-all duration-300 relative text-[0.8rem]`
          //     : `sm:px-4 sm:ml-[6rem] ml-0  bg-[#edf0f5] transition-all duration-300 relative text-[0.8rem]`
          // }
          className={`sm:px-4 sm:ml-[3rem] ml-0  bg-[#edf0f5] transition-all duration-300 relative text-[0.8rem]`}
        >
          <div className="p-4 dark:border-gray-700">
            <div
              className={
                toggleWidth
                  ? `text-[1rem] font-semibold absolute top-[-30px]`
                  : `text-[1rem] font-semibold absolute top-[-30px]`
              }
            >
              Dashboard
            </div>
            {/* <div className="mb-4">
              <BreadcrumbSection />
            </div> */}

            <div className="gap-3 sm:flex">
              <Card
                className={`h-[100px] boxShadow mb-5  ${
                  userRole !== "salesman" ? "sm:w-[60%]" : "sm:w-[50%]"
                } xl:h-[160px] px-8 py-5 flex flex-col `}
              >
                <p className="text-xl mb-5 font-semibold">Total Reports</p>
                <div className="flex gap-16">
                  <motion.div
                    initial={{ x: +100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 1,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="flex gap-2"
                  >
                    <div className="bg-gray-100 p-2 shadow-md shadow-[#002325] rounded-[8px]">
                      <LatestLeadsUIconSVG
                        cssData={{
                          fill: "#073336",
                          width: "38px",
                          height: "38px",
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[1rem] font-normal ">Leads</span>
                      <span className="text-[1rem] font-semibold">
                        {leadData?.totalLeads ? leadData?.totalLeads : 0}
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ x: +100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 1,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="flex gap-2"
                  >
                    <div className="bg-gray-100 p-2 shadow-md rounded-[8px] shadow-[#002325] ">
                      <CustomersIconSVG
                        cssData={{
                          fill: "#073336",
                          width: "38px",
                          height: "38px",
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[1rem] font-normal">Customers</span>
                      <span className="text-[1rem] font-semibold">
                        {customerData?.totalCount
                          ? customerData?.totalCount
                          : 0}
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ x: +100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 1,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="flex gap-2"
                  >
                    <div className="bg-gray-100 p-2 shadow-md rounded-[8px] shadow-[#002325]">
                      <LatestOrdersUIconSVG
                        cssData={{
                          fill: "#073336",
                          width: "38px",
                          height: "38px",
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[1rem] font-normal">Orders</span>
                      <span className="text-[1rem] font-semibold">
                        {orderData?.totalCount ? orderData?.totalCount : "0"}
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ x: +100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 1,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="flex gap-2"
                  >
                    <div className="bg-gray-100 p-2 shadow-md rounded-[8px] shadow-[#002325]">
                      <LatestAmendmentsUIconSVG
                        cssData={{
                          fill: "#073336",
                          width: "38px",
                          height: "38px",
                        }}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[1rem] font-normal">
                        Amendments
                      </span>
                      <span>
                        <span className="text-[1rem] font-semibold">
                          {amendmentData?.totalCount
                            ? amendmentData?.totalCount
                            : 0}
                        </span>
                      </span>
                    </div>
                  </motion.div>
                  {userRole !== "salesman" ? (
                    <motion.div
                      initial={{ x: +100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        duration: 1,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="flex gap-2"
                    >
                      <div className="bg-gray-100 p-2 shadow-md rounded-[8px] shadow-[#002325]">
                        <UserIconSVG
                          cssData={{
                            fill: "#073336",
                            width: "38px",
                            height: "38px",
                          }}
                        />
                      </div>
                      <div className="flex flex-col font-normal">
                        <span className="text-[1rem] font-normal">Users</span>
                        <span>
                          <span className="text-[1rem] font-semibold">
                            {userData?.totalUsers ? userData?.totalUsers : 0}
                          </span>
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    ""
                  )}
                </div>
              </Card>
              <Card
                className={`h-[100px] boxShadow mb-5   ${
                  userRole !== "salesman" ? "sm:w-[40%]" : "sm:w-[50%]"
                }  xl:h-[160px] px-8 py-5 flex flex-col`}
              >
                <motion.div
                  initial={{ x: +100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                >
                  <p className="text-xl mb-5 font-semibold">Total Sales</p>
                  <div className="flex gap-16">
                    <div className="flex gap-2">
                      <div className="bg-gray-100 p-2 shadow-md shadow-[#002325] rounded-[8px]">
                        <LatestLeadsUIconSVG
                          cssData={{
                            fill: "#073336",
                            width: "38px",
                            height: "38px",
                          }}
                        />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex">
                          <span className="text-[1rem] font-normal ">
                            Total Order Value :
                          </span>
                          <span className="text-[1rem] font-semibold mx-1">
                            {SalesData?.totalOverallResult?.overall
                              ?.totalOrderValue
                              ? SalesData?.totalOverallResult?.overall
                                  ?.totalOrderValue
                              : 0}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="text-[1rem] font-normal ">
                            Total Orders :
                          </span>
                          <span className="text-[1rem] font-semibold mx-1">
                            {SalesData?.totalOverallResult?.overall?.totalOrders
                              ? SalesData?.totalOverallResult?.overall
                                  ?.totalOrders
                              : 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </div>
            <div className="sm:grid sm:grid-cols-3 gap-4 mb-4">
              {/* latest Leads  */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="flex flex-col items-center  bg-[#ffffff] dark:bg-gray-800 shadow-lg my-3 sm:my-0 "
              >
                <p className="mt-5  bg-gray-100 p-6 rounded-full ">
                  <LatestLeadsUIconSVG
                    cssData={{
                      fill: "#073336",
                      width: "38px",
                      height: "38px",
                    }}
                  />
                </p>

                <p className="text-[0.8rem] md:text-[0.9rem] lg:text-[1.2rem] pt-5 pb-3 text-center font-semibold">
                  New Leads
                </p>
                <p className="text-[0.8rem] mb-4 text-[#676879]">
                  Track the Latest Leads
                </p>
                <div className=" w-full px-5 xl:px-10 ">
                  <ul>
                    {allLeads === undefined ? (
                      <div className="flex justify-center mb-6">
                        <LoaderIconSVG />
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : allLeads.length > 0 ? (
                      blockData(allLeads)?.map((item, index) => (
                        <li
                          className={`my-2  ${
                            index === 4 ? "border-none" : "border-b-2"
                          }`}
                          key={item?._id}
                        >
                          <div className="p-[1rem] text-center  flex justify-between gap-3 flex-col lg:flex-row">
                            <Link
                              className="font-bold  text-[0.8rem] xl:text-[0.9rem] lg:text-left lg:w-[40%] overflow-x-auto hover:underline"
                              href={`/leads/leadsDetails/${item?._id}`}
                            >
                              {item?.customer_id?.companyName
                                ? item?.customer_id?.companyName
                                : item?.customerName
                                ? item?.customerName
                                : "-"}
                            </Link>
                            {/* </Link> */}
                            <p className="font-semibold lg:text-left text-[#676879] lg:w-[33%] overflow-x-auto">
                              <span className="text-left">
                                {item?.customer_id?.contactName
                                  ? item?.customer_id?.contactName
                                  : "-"}
                              </span>
                            </p>
                            <p className="font-[300] lg:text-left lg:w-[18%] lg:ml-auto">
                              <span>
                                {item?.createdAt
                                  ? formatDate(item?.createdAt)
                                  : ""}
                              </span>
                            </p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div className="flex justify-center mb-6">
                        No leads data found..!!
                      </div>
                    )}
                  </ul>
                </div>
              </motion.div>

              {/* New Orders  */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="flex flex-col items-center bg-[#ffffff] dark:bg-gray-800 shadow-lg my-3 sm:my-0"
              >
                <p className="mt-5  bg-gray-100 p-6 rounded-full">
                  <LatestOrdersUIconSVG
                    cssData={{
                      fill: "#073336",
                      width: "38px",
                      height: "38px",
                    }}
                  />
                </p>
                <p className="text-[0.8rem] md:text-[0.9rem] lg:text-[1.2rem] pt-5 pb-3 text-center font-semibold">
                  New Orders
                </p>
                <p className="text-[0.8rem] mb-4 text-[#676879]">
                  Track the Latest Orders
                </p>
                <div className="w-full px-5 xl:px-10 ">
                  <ul>
                    {allOrders === undefined ? (
                      <div className="flex justify-center mb-6">
                        <LoaderIconSVG />
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : allOrders.length > 0 ? (
                      blockData(allOrders)?.map((item, index) => (
                        <li
                          className={`my-2  ${
                            index === 4 ? "border-none" : "border-b-2"
                          }`}
                          key={item?._id}
                        >
                          <div className="p-[1rem] text-center flex justify-between gap-3 flex-col lg:flex-row">
                            <p className="font-bold text-[0.8rem] xl:text-[0.9rem] lg:text-left lg:w-[40%] overflow-x-auto">
                              <Link
                                className="font-bold  text-[0.8rem] xl:text-[0.9rem] lg:text-left lg:w-[40%] overflow-x-auto hover:underline"
                                href={`/orders/orderDetails/${item?._id}`}
                              >
                                <span>
                                  {item?.orderNo ? item?.orderNo : "-"}
                                </span>
                              </Link>
                            </p>
                            <p className="font-semibold lg:text-left text-[#676879] lg:w-[33%] overflow-x-auto">
                              <span>
                                {item?.customer?.companyName
                                  ? item?.customer?.companyName
                                  : "-"}
                              </span>
                            </p>
                            <p className="font-[300] lg:text-left lg:w-[18%] lg:ml-auto">
                              <span>
                                {item?.dateOfOrder
                                  ? formatDate(item?.dateOfOrder)
                                  : "-"}
                              </span>
                            </p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div className="flex justify-center mb-6">
                        No orders data found..!!
                      </div>
                    )}
                  </ul>
                </div>
              </motion.div>

              {/* New Amendments  */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.04, 0.62, 0.23, 0.98] }}
                className="flex flex-col items-center bg-[#ffffff] dark:bg-gray-800 shadow-lg my-3 sm:my-0"
              >
                <p className="mt-5 bg-gray-100 p-6 rounded-full">
                  <LatestAmendmentsUIconSVG
                    cssData={{
                      fill: "#073336",
                      width: "38px",
                      height: "38px",
                    }}
                  />
                </p>
                <p className="text-[0.8rem] md:text-[0.9rem] lg:text-[1.2rem] pt-5 pb-3 text-center font-semibold">
                  New Amendments
                </p>
                <p className="text-[0.8rem] mb-4 text-center text-[#676879]">
                  Track the Latest Amendments
                </p>
                <div className="w-full px-5 xl:px-10 ">
                  <ul>
                    {allAmendments === undefined ? (
                      <div className="flex justify-center mb-6">
                        <LoaderIconSVG />
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : allAmendments.length > 0 ? (
                      blockData(allAmendments)?.map((item, index) => (
                        <li
                          className={`my-2 ${
                            index === 4 ? "border-none" : "border-b-2"
                          }`}
                          key={item?._id}
                        >
                          <div className="p-[1rem] text-center flex justify-between gap-3 flex-col lg:flex-row">
                            <Link
                              className="font-bold text-[0.8rem] xl:text-[0.9rem] lg:text-left lg:w-[40%] overflow-x-auto hover:underline"
                              href={`/amendment/amendmentDetails/${item?._id}`}
                            >
                              {item?.customer?.companyName || "-"}
                            </Link>
                            <p className="font-semibold lg:text-left text-[#676879] lg:w-[33%] overflow-x-auto">
                              {item?.customer?.contactName || "-"}
                            </p>
                            <p className="font-[300] lg:text-left lg:w-[18%] lg:ml-auto">
                              {item?.createdAt
                                ? formatDate(item?.createdAt)
                                : "-"}
                            </p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div className="flex justify-center mb-6">
                        No amendments data found..!!
                      </div>
                    )}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
