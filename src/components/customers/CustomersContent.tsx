"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "../common/data-table";
import { useRouter, useSearchParams } from "next/navigation";
import BreadcrumbSection from "../common/BreadcrumbSection";
import { useCustomerStore } from "@/Store/CustomerStore";
import PageHeader from "../common/PageHeader";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import Link from "next/link";
import { Button } from "../ui/button";
import { debounce } from "lodash";
import { usePathname } from "next/navigation";
import CustomPagination from "../CustomPagination/CustomPagination";
const animatedComponents = makeAnimated();

// Crumbs Array
const crumbs = [
  {
    id: 1,
    title: "Home",
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Customers",
    link: "/customers",
  },
];

const CustomersContent: React.FC = () => {
  const { fetchAllCustomerData, customerData, loading }: any =
    useCustomerStore();
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [allCustomers, setAllCustomers] = useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filtering, setFiltering] = React.useState("");
  const data = useMemo(() => allCustomers, [allCustomers]);

  const searchParams = useSearchParams();
  const queryParams = searchParams.get("id");
  const pathname = usePathname();
  let userDetails: any =
    typeof window !== "undefined" ? localStorage?.getItem("user") : null;
  let userRole = JSON.parse(userDetails)?.role;
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit = Number(searchParams.get("limit")) || 20;
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [searchInput, setSearchInput] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<any>({
    status: [],
  });

  const statusOptions = [
    { label: "In Process", value: "IN PROCESS" },
    { label: "Live", value: "LIVE" },
    { label: "Site Taken Down", value: "SITE TAKEN DOWN" },
    { label: "Suspended", value: "SUSPENDED" },
    { label: "Upload", value: "UPLOAD" },
    { label: "Will Get Cancelled", value: "WILL GET CANCELLED" },
  ];

  useEffect(() => {
    if (
      customerData === "Invalid refresh token" ||
      customerData === "User not found" ||
      customerData === "Invalid User Access Token" ||
      customerData === "Invalid access token" ||
      customerData === "Unauthorized request: No access or refresh token"
    ) {
      router.push("/auth/login");
    } else {
      setLoader(false);
      setAllCustomers(
        customerData?.customers ? customerData?.customers || [] : []
      );
      setTotalPages(customerData?.totalPages);
    }
  }, [customerData, router, customerData?.totalPages]);

  const onPageChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString()); // ✅ Convert to string first

    params.set("page", newPage.toString());
    params.set("limit", newLimit.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  const tableInstance = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 25, //custom default page size
      },
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      globalFilter: filtering,
      columnFilters,
    },
    onGlobalFilterChange: setFiltering,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // ==========================
  useEffect(() => {
    if (searchInput !== "") {
      setPage(1);
    }
  }, [searchInput]);

  const debouncedSearch = useCallback(
    debounce((searchInput) => {
      fetchAllCustomerData({
        page,
        limit,
        searchInput,
        filters,
      });
    }, 500),
    [fetchAllCustomerData, filters, page, limit]
  );

  useEffect(() => {
    fetchAllCustomerData({
      page,
      limit,
      searchInput,
      filters,
    });
  }, [page, limit, searchInput, filters, fetchAllCustomerData]);

  useEffect(() => {
    if (searchInput !== "") {
      debouncedSearch(searchInput);
    } else {
      fetchAllCustomerData({ page, limit, searchInput, filters });
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [
    searchInput,
    debouncedSearch,
    page,
    limit,
    filters,
    fetchAllCustomerData,
  ]);
  // ==========================================================

  return (
    <div className="pr-0 pl-2 py-1 relative ">
      {/* <div className="mb-1">
        <BreadcrumbSection crumbs={crumbs} />
      </div> */}

      <div className="w-[300px] lg:absolute  z-[100] mt-2 ">
        <Select
          className="text-[0.8rem] boxShadow border-none"
          classNamePrefix="react-select-custom-styling"
          closeMenuOnSelect={true}
          isClearable
          components={animatedComponents}
          options={statusOptions}
          // value={filters.outcome}
          onChange={(selectedOption: any) => {
            const selectedValues = selectedOption ? selectedOption.value : [];
            setFilters((prev: any) => ({
              ...prev,
              status: selectedValues,
            }));
            setPage(1);
          }}
          placeholder="Select a Status"
        />
      </div>

      <div className="md:flex justify-center sm:justify-end my-2">
        <PageHeader
          tableInstance={tableInstance}
          setSearchInput={setSearchInput}
        />

        <div className="flex justify-normal lg:justify-end">
          <Link href={"/customers/addCustomer"}>
            <Button
              variant="outline"
              className=" text-[0.8rem] text-white bg-[#004d4b] hover:bg-[#fff] hover:text-[#004d4b] boxShadow hover:border-[#004d4b] "
            >
              New Customer
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        text="cutomer"
        queryParams={queryParams ? queryParams : ""}
        columns={columns}
        tableInstance={tableInstance}
        loading={loading}
      />

      <CustomPagination
        setLimit={setLimit}
        limit={limit}
        page={page}
        onPageChange={onPageChange}
        data={allCustomers}
        totalPages={totalPages}
      />
    </div>
  );
};

export default CustomersContent;
