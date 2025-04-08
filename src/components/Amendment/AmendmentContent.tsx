"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "../common/data-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BreadcrumbSection from "../common/BreadcrumbSection";

import Select from "react-select";
import makeAnimated from "react-select/animated";
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

import { useAmendmentStore } from "@/Store/AmendmentStore";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { debounce } from "lodash";
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
    title: "Amendments",
    link: "",
  },
];

const AmendmentContent: React.FC = () => {
  // Hooks and States
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("id");
  const { fetchAmendmentData, amendmentData, loading } = useAmendmentStore();
  const [allAmendments, setAllAmendments] = useState<any>([]);
  const [loader, setLoader] = useState(true);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filtering, setFiltering] = React.useState("");
  const data = useMemo(() => allAmendments, [allAmendments]);
  const [filters, setFilters] = useState<any>({
    status: [],
  });
  const [searchInput, setSearchInput] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit = Number(searchParams.get("limit")) || 20;
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const statusOptions = [
    { label: "In Process", value: "In Process" },
    { label: "In Query", value: "In Query" },
    { label: "Complete", value: "Complete" },
  ];

  useEffect(() => {
    if (
      amendmentData === "Invalid refresh token" ||
      amendmentData === "User not found" ||
      amendmentData === "Invalid User Access Token" ||
      amendmentData === "Invalid access token" ||
      amendmentData === "Unauthorized request: No access or refresh token"
    ) {
      router.push("/auth/login");
    } else {
      setLoader(false);
      setAllAmendments(
        amendmentData?.amendments ? amendmentData?.amendments || [] : []
      );
      setTotalPages(amendmentData?.totalPages);
    }
  }, [amendmentData, router, amendmentData?.totalPages]);

  const onPageChange = (newPage: number, newLimit: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString()); // ✅ Convert to string first

    params.set("page", newPage.toString());
    params.set("limit", newLimit.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (searchInput !== "") {
      setPage(1);
    }
  }, [searchInput]);

  const debouncedSearch = useCallback(
    debounce((searchInput) => {
      fetchAmendmentData({
        page,
        limit,
        searchInput,
        filters,
      });
    }, 500),
    [fetchAmendmentData, filters, page, limit]
  );

  useEffect(() => {
    fetchAmendmentData({
      page,
      limit,
      searchInput,
      filters,
    });
  }, [page, limit, searchInput, filters, fetchAmendmentData]);

  useEffect(() => {
    if (searchInput !== "") {
      debouncedSearch(searchInput);
    } else {
      fetchAmendmentData({ page, limit, searchInput, filters });
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchInput, debouncedSearch, page, limit, filters, fetchAmendmentData]);

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

  return (
    <div className="px-4 py-2 relative">
      {/* <div className="text-xl font-semibold absolute top-[-60px]">
        Amendments
      </div> */}
      {/* <div className="mb-1">
        <BreadcrumbSection crumbs={crumbs} />
      </div> */}

      <div className="w-[300px] lg:absolute z-[52] mt-2 ">
        <Select
          className="text-[0.8rem] boxShadow"
          classNamePrefix="react-select-custom-styling"
          closeMenuOnSelect={false}
          components={animatedComponents}
          isClearable
          options={statusOptions}
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

        {/* <AddAmendmentDialoge getAllAmendment={fetchAmendmentData} />
         */}
        <div className="flex justify-normal lg:justify-end">
          <Link href={"/amendment/addAmendment"}>
            <Button
              variant="outline"
              className=" text-[0.8rem] text-white bg-[#004d4b] hover:bg-[#fff] hover:text-[#004d4b] boxShadow hover:border-[#004d4b]"
            >
              New Amendment
            </Button>
          </Link>
        </div>
      </div>

      <DataTable
        text="amendment"
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
        data={allAmendments}
        totalPages={totalPages}
      />
    </div>
  );
};

export default AmendmentContent;
