"use client";

import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { motion } from "framer-motion";
import { LatestLeadsUIconSVG, LoaderIconSVG } from "@/utils/SVGs/SVGs";
import Link from "next/link";
import { formatDate } from "@/common/commonFunctions";
import { WebsitelargeDataHoverBox } from "../HoverCard/WebsiteLargeDataHoverBox";

interface GridItemProps {
  area: string;
  data: any[];
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  blockData: any;
  typeText: string;
}
interface AnimatedGlowingProps {
  data: any[];
  blockData: any;
  icon: React.ReactNode;
  title: string;
  description: string;
  typeText: string;
}
interface CommonListRowProps {
  item: any;
  typeText: string;
}

const CommonListRow: React.FC<CommonListRowProps> = ({ item, typeText }) => {
  const getLinkHref = () => {
    if (typeText === "orders") return `/orders/orderDetails/${item?._id}`;
    if (typeText === "leads") return `/leads/leadsDetails/${item?._id}`;
    if (typeText === "amendments")
      return `/amendment/amendmentDetails/${item?._id}`;
    return "#";
  };

  const getPrimaryText = () => {
    if (typeText === "orders") return item?.orderNo || "-";
    if (typeText === "leads")
      return item?.customer_id?.companyName || item?.customerName || "-";
    if (typeText === "amendments") return item?.customer?.companyName || "-";
    return "-";
  };

  const getSecondaryText = () => {
    if (typeText === "orders") return item?.customer?.companyName || "-";
    if (typeText === "leads") return item?.customer_id?.contactName || "-";
    if (typeText === "amendments") return item?.customer?.contactName || "-";
    return "-";
  };

  const getDate = () => {
    if (typeText === "orders")
      return item?.dateOfOrder ? formatDate(item?.dateOfOrder) : "-";
    return item?.createdAt ? formatDate(item?.createdAt) : "-";
  };

  return (
    <div className="p-[1rem] text-center flex justify-between gap-3 flex-col lg:flex-row">
      <Link
        className="font-bold text-[0.8rem] xl:text-[0.9rem] lg:text-left lg:w-[40%] overflow-x-auto hover:underline"
        href={getLinkHref()}
      >
        <WebsitelargeDataHoverBox data={getPrimaryText()} />
        {/* {getPrimaryText()} */}
      </Link>
      <p className="font-semibold lg:text-left text-[#676879] lg:w-[33%] overflow-x-auto">
        <span>
          <WebsitelargeDataHoverBox data={getSecondaryText()} />
        </span>
      </p>
      <p className="font-[300] lg:text-left lg:w-[18%]">
        <span>{getDate()}</span>
      </p>
    </div>
  );
};

const GridItem = ({
  area,
  data,
  icon,
  title,
  description,
  blockData,
  typeText,
}: GridItemProps) => {
  return (
    <li className={` list-none ${area}`}>
      <div className="relative h-full border  p-2  md:p-2">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex flex-col items-center  bg-[#ffffff] dark:bg-gray-800 shadow-lg my-3 sm:my-0 hover:bg-gradient-to-r from-white to-green-100 text-green-800"
        >
          <p className="mt-8 bg-[#00817a29] p-4 rounded-full ">
            {/* <LatestLeadsUIconSVG
              cssData={{
                fill: "#073336",
                width: "38px",
                height: "38px",
              }}
            /> */}
            {icon}
          </p>

          <p className="text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem] pt-2 xl:pt-3 pb-2 text-center font-semibold">
            {/* New Leads */}
            {title}
          </p>

          <p className="text-[0.8rem] mb-4 text-[#676879]">
            {/* Track the Latest Leads */}
            {description}
          </p>
          <div className=" w-full px-5 ">
            <ul>
              {data === undefined ? (
                <div className="flex justify-center mb-6">
                  <LoaderIconSVG />
                  <span className="sr-only">Loading...</span>
                </div>
              ) : data?.length > 0 ? (
                blockData(data)?.map((item: any, index: any) => (
                  <li
                    className={` ${
                      index === 4
                        ? "border-none"
                        : "border-b-2 hover:border-[#228b2259]"
                    }`}
                    key={item?._id}
                  >
                    <CommonListRow item={item} typeText={typeText} />
                    {/* <div className="p-[1rem] text-center  flex justify-between gap-3 flex-col lg:flex-row">
                      <Link
                        className="font-bold text-[0.8rem] xl:text-[0.9rem] lg:text-left lg:w-[40%] overflow-x-auto hover:underline"
                        href={`/leads/leadsDetails/${item?._id}`}
                      >
                        {item?.customer_id?.companyName
                          ? item?.customer_id?.companyName
                          : item?.customerName
                          ? item?.customerName
                          : "-"}
                      </Link>

                      <p className="font-semibold lg:text-left text-[#676879] lg:w-[33%] overflow-x-auto">
                        <span className="text-left">
                          {item?.customer_id?.contactName
                            ? item?.customer_id?.contactName
                            : "-"}
                        </span>
                      </p>
                      <p className="font-[300] lg:text-left lg:w-[18%] lg:ml-auto">
                        <span>
                          {item?.createdAt ? formatDate(item?.createdAt) : ""}
                        </span>
                      </p>
                    </div> */}
                  </li>
                ))
              ) : (
                <div className="flex justify-center mb-6">
                  No data found..!!
                </div>
              )}
            </ul>
          </div>
        </motion.div>
      </div>
    </li>
  );
};

export function AnimatedGlowingEffect({
  data,
  title,
  description,
  blockData,
  icon,
  typeText,
}: AnimatedGlowingProps) {
  return (
    <ul className="">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={icon}
        title={title}
        description={description}
        data={data}
        blockData={blockData}
        typeText={typeText}
      />
    </ul>
  );
}
