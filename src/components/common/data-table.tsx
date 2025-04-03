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
  // return (
  //   <div className="space-y-4 text-[#676879]">
  //     <div className=" border">
  //       <div className="h-[78vh] overflow-x-auto bg-[#fff] boxShadow">
  //         <div className="overflow-x-auto max-w-[100%] ">
  //           <Table className="bg-[#fff]">
  //             <TableHeader className="bg-[#29354f] sticky top-0 z-10 ">
  //               {/* Make the header sticky */}
  //               {tableInstance &&
  //                 tableInstance?.getHeaderGroups()?.map((headerGroup: any) => (
  //                   <TableRow key={headerGroup?.id}>
  //                     {headerGroup?.headers?.map((header: any) => {
  //                       return (
  //                         <TableHead
  //                           key={header?.id}
  //                           colSpan={header?.colSpan}
  //                           className={`${
  //                             header?.id === "actions" ||
  //                             header?.id === "avatar"
  //                               ? "flex justify-center items-center text-nowrap "
  //                               : "text-nowrap"
  //                           } text-white`}
  //                         >
  //                           {header?.isPlaceholder
  //                             ? null
  //                             : flexRender(
  //                                 header?.column?.columnDef?.header,
  //                                 header?.getContext()
  //                               )}
  //                         </TableHead>
  //                       );
  //                     })}
  //                   </TableRow>
  //                 ))}
  //             </TableHeader>
  //             <TableBody>
  //               {loading ? (
  //                 <TableRow>
  //                   <TableCell colSpan={columns?.length} className="h-24 ">
  //                     {tableInstance?.options?.data?.[0] &&
  //                     Object.keys(tableInstance?.options?.data[0]).some(
  //                       (item) => item === "socialMedia"
  //                     ) ? (
  //                       <div className="flex justify-start ml-[500px]">
  //                         <LoaderIconSVG />
  //                         <span className="px-2">Loading...</span>
  //                       </div>
  //                     ) : (
  //                       <div className="flex justify-center">
  //                         <LoaderIconSVG />
  //                         <span className="px-2">Loading...</span>
  //                       </div>
  //                     )}
  //                   </TableCell>
  //                 </TableRow>
  //               ) : tableInstance?.getRowModel()?.rows?.length !== 0 ? (
  //                 tableInstance?.getRowModel()?.rows?.map((row: any) => (
  //                   <TableRow
  //                     key={row?.id}
  //                     data-state={row?.getIsSelected() && "selected"}
  //                     className="bg-slate-200"
  //                   >
  //                     {row?.getVisibleCells()?.map((cell: any) => (
  //                       <TableCell
  //                         key={cell?.id}
  //                         className={`${
  //                           cell?.column?.id === "actions" ||
  //                           cell?.column?.id === "avatar"
  //                             ? "flex justify-center items-center text-nowrap"
  //                             : ""
  //                         }`}
  //                       >
  //                         {flexRender(
  //                           cell?.column?.columnDef?.cell,
  //                           cell?.getContext()
  //                         )}
  //                       </TableCell>
  //                     ))}
  //                   </TableRow>
  //                 ))
  //               ) : (
  //                 <TableRow>
  //                   <TableCell
  //                     colSpan={columns?.length}
  //                     className="h-24 text-center"
  //                   >
  //                     <div role="status" className="flex justify-center">
  //                       No data Found !!
  //                     </div>
  //                   </TableCell>
  //                 </TableRow>
  //               )}
  //             </TableBody>
  //           </Table>
  //         </div>
  //       </div>
  //     </div>
  //     <DataTablePagination table={tableInstance} />
  //   </div>
  // );
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
// "use client";

// import * as React from "react";
// import "../../styles/common.css";
// import { ColumnDef, flexRender } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";

// import { DataTablePagination } from "./data-table-pagination";
// import { LoaderIconSVG } from "@/utils/SVGs/SVGs";
// import { ScrollArea } from "../ui/scroll-area";
// import SideDrawer from "./Editor/SideDrawer";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   tableInstance: any;
//   loading: boolean;
//   queryParams: string; // Query params that will match the row for highlighting and opening SideDrawer
//   text: string;
// }

// export function DataTable<TData, TValue>({
//   queryParams,
//   columns,
//   tableInstance,
//   loading,
//   text,
// }: DataTableProps<TData, TValue>) {
//   const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

//   // Track the previously passed queryParams to avoid unnecessary SideDrawer openings
//   const prevQueryParams = React.useRef<string | null>(null);

//   // Automatically open the sidebar only when queryParams changes
//   React.useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       if (queryParams && queryParams !== prevQueryParams.current) {
//         setIsSidebarOpen(true); // Open the sidebar
//         prevQueryParams.current = queryParams;
//       }
//     }, 300); // Delay the opening to avoid rapid triggering

//     return () => clearTimeout(debounceTimeout); // Clean up previous timeouts
//   }, [queryParams]);

//   return (
//     <div className="space-y-4 text-[#676879]">
//       <div className="border">
//         <div className="h-[82vh] overflow-x-auto bg-[#fff] boxShadow">
//           <Table className="bg-[#fff]">
//             <TableHeader className="bg-[#29354f] sticky top-0 z-0">
//               {tableInstance?.getHeaderGroups()?.map((headerGroup: any) => (
//                 <TableRow key={headerGroup?.id}>
//                   {headerGroup?.headers?.map((header: any) => (
//                     <TableHead
//                       key={header?.id}
//                       colSpan={header?.colSpan}
//                       className={`text-nowrap text-white`}
//                     >
//                       {header?.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header?.column?.columnDef?.header,
//                             header?.getContext()
//                           )}
//                     </TableHead>
//                   ))}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {loading ? (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} className="h-24">
//                     <div className="flex justify-center">
//                       <LoaderIconSVG />
//                       <span className="px-2">Loading...</span>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ) : tableInstance?.getRowModel()?.rows?.length !== 0 ? (
//                 tableInstance.getRowModel().rows.map((row: any) => {
//                   const isHighlighted = row.original._id === queryParams; // Highlight the row if it matches queryParams
//                   return (
//                     <TableRow
//                       key={row.id}
//                       className={isHighlighted ? "bg-[#ced7ea]" : ""} // Apply highlight class if it matches
//                     >
//                       {row.getVisibleCells().map((cell: any) => (
//                         <TableCell key={cell.id} className="text-nowrap">
//                           {flexRender(
//                             cell.column.columnDef.cell,
//                             cell.getContext()
//                           )}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   );
//                 })
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="h-24 text-center"
//                   >
//                     <div role="status" className="flex justify-center">
//                       No data Found !!
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </div>

//       {text === "orders" || text === "customer" ? (
//         ""
//       ) : (
//         <DataTablePagination table={tableInstance} />
//       )}

//       {/* Sidebar for detailed view */}
//       {/* {isSidebarOpen && (
//         <SideDrawer
//           amendmentId={queryParams} // Passing the queryParams as the amendment ID to the SideDrawer
//           onClose={() => setIsSidebarOpen(false)} // Close sidebar on close
//         />
//       )} */}
//     </div>
//   );
// }
