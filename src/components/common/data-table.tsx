"use client";

import * as React from "react";
import "../../styles/common.css";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import { motion } from "framer-motion";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { LoaderIconSVG } from "@/utils/SVGs/SVGs";
import "../../styles/common.css";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableInstance: any;
  loading: boolean;
  queryParams: string;
  text: string;
}

export function DataTable<TData, TValue>({
  queryParams,
  columns,
  tableInstance,
  loading,
  text,
}: DataTableProps<TData, TValue>) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setIsScrolling(scrollContainerRef.current.scrollLeft > 0);
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-4 text-[#676879]"
    >
      <div className="border">
        <div
          ref={scrollContainerRef}
          className="h-[82vh] overflow-x-auto boxShadow"
        >
          <Table className="bg-[#fff]" isScrolling={isScrolling}>
            <TableHeader className="bg-[#29354f] sticky top-0 z-30">
              {tableInstance?.getHeaderGroups()?.map((headerGroup: any) => (
                <TableRow key={headerGroup?.id}>
                  {headerGroup?.headers?.map((header: any) => (
                    <TableHead
                      key={header?.id}
                      colSpan={header?.colSpan}
                      className={`text-nowrap text-white `}
                      isScrolling={isScrolling}
                    >
                      {header?.isPlaceholder
                        ? null
                        : flexRender(
                            header?.column?.columnDef?.header,
                            header?.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                // <TableRow>
                //   <TableCell colSpan={columns.length} className="h-24">
                //     <div className="flex justify-center">
                //       <LoaderIconSVG />
                //       <span className="px-2">Loading...</span>
                //     </div>
                //   </TableCell>
                // </TableRow>
                tableInstance
                  ?.getRowModel()
                  ?.rows?.map((_: any, index: any) => (
                    <TableRow key={index}>
                      {columns.map((_, colIndex) => (
                        <TableCell key={colIndex}>
                          <Skeleton className="h-4 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : tableInstance?.getRowModel()?.rows?.length !== 0 ? (
                tableInstance
                  ?.getRowModel()
                  ?.rows?.map((row: any, index: number) => {
                    const isHighlighted = row.original._id === queryParams; // Check if the row ID matches queryParams
                    return (
                      <TableRow
                        key={row.id}
                        // className={isHighlighted ? "bg-[#ced7ea]" : ""}
                        className={`${
                          isHighlighted
                            ? "bg-[#ced7ea]" // Highlighted row color
                            : index % 2 !== 0
                            ? "bg-[#E2F2F1]" // Light gray for even rows
                            : "bg-white" // White for odd rows
                        }`}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell: any) => (
                          <TableCell
                            key={cell.id}
                            rowIndex={index}
                            className="text-nowrap"
                            isScrolling={isScrolling}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns?.length}
                    className="h-20 text-center"
                  >
                    <div role="status" className="flex justify-center">
                      No data Found !!
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      {text === "orders" ||
      text === "cutomer" ||
      text === "users" ||
      text === "technical" ||
      text === "amendment" ||
      text === "website-content" ||
      text === "product-flow" ||
      text === "lead" ||
      text === "copywriter" ? (
        ""
      ) : (
        <DataTablePagination table={tableInstance} />
      )}
    </motion.div>
  );
}
